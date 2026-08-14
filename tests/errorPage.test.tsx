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
  it("renders the error page when navigating to an unknown route", async () => {
    const { default: router } = await import("../src/routes");
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
  });

  it("navigates back to the home page from the error page", async () => {
    const { default: router } = await import("../src/routes");
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
  });
});
