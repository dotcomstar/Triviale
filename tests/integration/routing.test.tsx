import { act, fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { GAME_TITLE, PLAY_CLASSIC_MODE_LABEL } from "../../src/constants/strings";

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

describe("app routing", () => {
  it("loads the web page and routes to the home page at /", async () => {
    const { default: router } = await import("../../src/routes");
    render(<RouterProvider router={router} />);

    // NavBar's title, present once the home route has actually rendered.
    expect(
      await screen.findByText(GAME_TITLE, { selector: "h3" })
    ).toBeInTheDocument();

    // Dismiss the first-load landing dialog, which otherwise leaves the
    // rest of the page aria-hidden underneath it.
    const playButton = await screen.findByRole("button", {
      name: PLAY_CLASSIC_MODE_LABEL,
    });
    await act(async () => {
      fireEvent.click(playButton);
    });

    // The keyboard is unique to the home/game page. The landing dialog's
    // exit transition keeps the rest of the page aria-hidden briefly, so
    // wait for it to finish closing.
    expect(
      await screen.findByRole("button", { name: "ENTER key" })
    ).toBeInTheDocument();
  });
});
