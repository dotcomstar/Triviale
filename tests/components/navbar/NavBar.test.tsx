import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NavBar from "../../../src/components/navbar/NavBar";
import ThemedLayout from "../../../src/components/ThemedLayout";
import useDialogStore from "../../../src/stores/dialogStore";
import useEditingStore from "../../../src/stores/editingStore";

vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
  }),
  withAuthenticationRequired: (component: unknown) => component,
}));

// Same matchMedia-override trick as ThemedLayout.test.tsx: tests/setup.ts
// installs a permanent polyfill that always returns matches: false, which
// already covers the mobile branch by default -- this override is only
// needed to reach the desktop (isNotMobile) branch.
const setMatchMediaMatches = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

// dialogStore's initial state defaults isLandingOpen to true, which renders
// LandingDialog's LandingButtons -- those use custom `trivialeBlack`/
// `trivialeGray` palette colors that only exist on the real theme
// ThemedLayout builds (default createTheme() doesn't have them, and crashes
// trying to read `.main` off an undefined palette entry). Same reason
// HomePage.test.tsx wraps HomePage in the real ThemedLayout rather than a
// mock.
const renderNavBar = () =>
  render(
    <ThemedLayout>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </ThemedLayout>
  );

describe("NavBar mobile/desktop branch", () => {
  beforeEach(() => {
    useDialogStore.setState(useDialogStore.getInitialState(), true);
    // isLandingOpen defaults to true. Left open, LandingDialog's Modal marks
    // the rest of the page aria-hidden (same thing routing.test.tsx has to
    // dismiss), which would make getByRole("button", ...) fail to find the
    // Help/Stats buttons regardless of the mobile/desktop branch under
    // test -- a false negative, not a real assertion of either branch.
    useDialogStore.getState().setLandingOpen(false);
    useEditingStore.setState(useEditingStore.getInitialState(), true);
  });

  it("hides the Help/Stats buttons below the mobile cutoff", () => {
    setMatchMediaMatches(false);

    renderNavBar();

    expect(
      screen.queryByRole("button", { name: "help" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "stats" })
    ).not.toBeInTheDocument();
  });

  it("shows the Help/Stats buttons at/above the desktop cutoff", () => {
    setMatchMediaMatches(true);

    renderNavBar();

    expect(screen.getByRole("button", { name: "help" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "stats" })).toBeInTheDocument();
  });
});
