import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ErrorPage from "../../src/pages/ErrorPage";
import useDialogStore from "../../src/stores/dialogStore";

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
  // dialogStore is a Zustand singleton shared across test files in this
  // worker -- reset it for isolation, matching the rest of the suite's
  // convention (this describe block predates that convention, which is how
  // it went unnoticed until now).
  beforeEach(() => {
    useDialogStore.setState(useDialogStore.getInitialState(), true);
  });

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

// The two tests above only exercise the isRouteErrorResponse branch (an
// unmatched route). ErrorPage's other three branches -- a real Error
// instance, a thrown string, and the unknown-value fallback -- need a
// component that throws a controlled value, since this app's router has no
// loaders/actions that could throw one for us.
const Thrower = ({ error }: { error: unknown }) => {
  throw error;
};

// Topology mirrors src/routes.tsx: a root route carrying errorElement, with
// no root `element` (react-router defaults a childless-element route to
// rendering an Outlet), and the thrower nested as its index child -- the
// same shape the real app uses for HomePage. This lets ErrorPage's own
// errorElement catch a render-phase throw from its sibling route, exactly
// as it does in production, without needing the full src/routes.tsx router.
const renderErrorFor = (error: unknown) => {
  const router = createMemoryRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <Thrower error={error} /> }],
    },
  ]);
  return render(<RouterProvider router={router} />);
};

describe("error page branch coverage", () => {
  beforeEach(() => {
    useDialogStore.setState(useDialogStore.getInitialState(), true);
  });

  it("renders an Error instance's message and leaves every dialog closed", async () => {
    // Seed some dialogs open first. The 08-14 finding that this should move
    // to useEffect was tried and retracted -- see ErrorPage.tsx's comment
    // and the 08-14 doc's Revisions section -- so this deliberately stays a
    // render-body call. Asserting the *resulting store state* (not how it
    // got there) keeps this test meaningful either way.
    useDialogStore.getState().setStatsOpen(true);
    useDialogStore.getState().setHelpOpen(true);

    renderErrorFor(new Error("boom"));

    expect(await screen.findByText("boom")).toBeInTheDocument();
    expect(useDialogStore.getState()).toMatchObject({
      isHelpOpen: false,
      isStatsOpen: false,
      isSettingsOpen: false,
      isLandingOpen: false,
    });
  });

  it("renders a thrown string directly as the error message", async () => {
    renderErrorFor("plain string error");

    expect(await screen.findByText("plain string error")).toBeInTheDocument();
  });

  it("falls back to 'Unknown error' and logs the value for a non-Error, non-string throw", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const weirdError = { code: 42 };

    renderErrorFor(weirdError);

    expect(await screen.findByText("Unknown error")).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith(weirdError);

    consoleErrorSpy.mockRestore();
  });
});
