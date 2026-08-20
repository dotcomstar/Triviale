import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserProfilePage from "../../src/pages/UserProfilePage";
import {
  DELETE_USER_PROFILE_TEXT,
  PROFILE_PAGE_TITLE,
} from "../../src/constants/strings";

// Mutable Auth0 mock -- isLoading/isAuthenticated/user all need to vary
// per test, same "hoisted object read inside the mock factory" pattern as
// HamburgerDrawer.test.tsx.
const authState = vi.hoisted(() => ({
  isLoading: false,
  isAuthenticated: false,
  user: undefined as
    | { name?: string; email?: string; picture?: string }
    | undefined,
}));

vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  useAuth0: () => ({
    isLoading: authState.isLoading,
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
  }),
  withAuthenticationRequired: (component: unknown) => component,
}));

describe("UserProfilePage", () => {
  beforeEach(() => {
    authState.isLoading = false;
    authState.isAuthenticated = false;
    authState.user = undefined;
  });

  it("shows a loading message while Auth0 is still resolving", () => {
    authState.isLoading = true;

    render(<UserProfilePage />);

    expect(screen.getByText("Loading ...")).toBeInTheDocument();
    expect(screen.queryByText(PROFILE_PAGE_TITLE)).not.toBeInTheDocument();
  });

  it("renders nothing when not authenticated and not loading", () => {
    authState.isLoading = false;
    authState.isAuthenticated = false;

    const { container } = render(<UserProfilePage />);

    // isAuthenticated && (<Stack>...) evaluates to `false`, so React renders
    // nothing at all -- not even an empty wrapper.
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the profile name, email, and avatar when authenticated", () => {
    authState.isAuthenticated = true;
    authState.user = {
      name: "Ada Lovelace",
      email: "ada@example.com",
      picture: "https://example.com/ada.png",
    };

    render(<UserProfilePage />);

    expect(screen.getByText(PROFILE_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();

    const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(avatar).toHaveAttribute("src", "https://example.com/ada.png");
  });

  it("encodes the user's email in the delete-account mailto link (08-17 fix)", () => {
    authState.isAuthenticated = true;
    authState.user = {
      name: "Weird Name",
      email: "weird+chars@example.com",
      picture: "",
    };

    render(<UserProfilePage />);

    const deleteLink = screen
      .getByText(DELETE_USER_PROFILE_TEXT)
      .closest("a");

    expect(deleteLink).not.toBeNull();
    // Before the fix, user?.email was interpolated into the mailto subject
    // raw -- a literal "+" or "@" would corrupt/truncate the query string.
    expect(deleteLink?.getAttribute("href")).toContain(
      encodeURIComponent("weird+chars@example.com")
    );
  });
});
