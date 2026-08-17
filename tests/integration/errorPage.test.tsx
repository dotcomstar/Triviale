import { act, fireEvent, render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

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

describe("error page", () => {
  // Full-router renders (now rendering 3 questions' worth of UI instead of
  // 1) are comfortably under a second alone, but can cross Vitest's default
  // 5s timeout under the parallel worker contention of a full `npm test`
  // run — bump per-test rather than the global default.
  it(
    "renders the error page when navigating to an unknown route",
    async () => {
      const { default: router } = await import("../../src/routes");
      render(<RouterProvider router={router} />);

      await act(async () => {
        await router.navigate("/this-route-does-not-exist");
      });

      expect(
        await screen.findByRole("heading", { name: "Oops!" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Return home" })
      ).toBeInTheDocument();
    },
    15000
  );

  it(
    "navigates back to the home page from the error page",
    async () => {
      const { default: router } = await import("../../src/routes");
      render(<RouterProvider router={router} />);

      await act(async () => {
        await router.navigate("/this-route-does-not-exist");
      });
      const returnHomeButton = await screen.findByRole("button", {
        name: "Return home",
      });

      await act(async () => {
        fireEvent.click(returnHomeButton);
      });

      expect(
        await screen.findByRole("button", { name: "ENTER key" })
      ).toBeInTheDocument();
    },
    15000
  );
});
