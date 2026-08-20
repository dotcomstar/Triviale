import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HamburgerDrawer from "../../../../src/components/navbar/drawer/HamburgerDrawer";
import {
  HELP_TITLE,
  STATISTICS_TITLE,
} from "../../../../src/constants/strings";
import useDialogStore from "../../../../src/stores/dialogStore";

// Mutable Auth0 mock: unlike routing.test.tsx/errorPage.test.tsx (which only
// ever need isAuthenticated: false), this file needs to flip it per test to
// cover the Login-vs-Log-Out item. Login/logout "calls" are tracked as plain
// counters on the same hoisted object rather than vi.fn(), so there's no
// question about whether a vi.fn() created outside vi.hoisted is safe to
// reference from inside the mock factory (which Vitest hoists above every
// other statement in the file, including a plain `const` declaration).
const authState = vi.hoisted(() => ({
  isAuthenticated: false,
  loginCalls: 0,
  logoutCalls: 0,
}));

vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  useAuth0: () => ({
    isAuthenticated: authState.isAuthenticated,
    isLoading: false,
    user: undefined,
    loginWithRedirect: () => {
      authState.loginCalls++;
    },
    logout: () => {
      authState.logoutCalls++;
    },
  }),
  withAuthenticationRequired: (component: unknown) => component,
}));

const openDrawer = () => {
  render(<HamburgerDrawer />);
  fireEvent.click(screen.getByRole("button", { name: "menu" }));
};

describe("HamburgerDrawer", () => {
  beforeEach(() => {
    authState.isAuthenticated = false;
    authState.loginCalls = 0;
    authState.logoutCalls = 0;
    useDialogStore.setState(useDialogStore.getInitialState(), true);
  });

  it("is closed by default and opens when the menu button is clicked", () => {
    render(<HamburgerDrawer />);
    // MUI's Drawer defaults keepMounted to false, so its contents aren't in
    // the DOM at all until opened.
    expect(screen.queryByText(HELP_TITLE)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "menu" }));

    expect(screen.getByText(HELP_TITLE)).toBeInTheDocument();
  });

  it("shows a Login item and calls loginWithRedirect when unauthenticated", () => {
    authState.isAuthenticated = false;
    openDrawer();

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Login"));

    expect(authState.loginCalls).toBe(1);
  });

  it("shows a Log Out item and calls logout when authenticated", () => {
    authState.isAuthenticated = true;
    openDrawer();

    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Log Out"));

    expect(authState.logoutCalls).toBe(1);
  });

  it("opens the Help dialog from the Help item", () => {
    openDrawer();

    fireEvent.click(screen.getByText(HELP_TITLE));

    expect(useDialogStore.getState().isHelpOpen).toBe(true);
  });

  it("opens the Stats dialog from the Statistics item", () => {
    openDrawer();

    fireEvent.click(screen.getByText(STATISTICS_TITLE));

    expect(useDialogStore.getState().isStatsOpen).toBe(true);
  });

  it("stays open on a Tab or Shift keydown, but closes on any other key", async () => {
    openDrawer();

    // toggleDrawer's only real branch: keydown events with key "Tab" or
    // "Shift" are ignored (so tabbing through the drawer's own focusable
    // items doesn't accidentally close it); every other keydown on the
    // drawer's root closes it, same as a click on the scrim would.
    fireEvent.keyDown(screen.getByText(HELP_TITLE), { key: "Tab" });
    expect(screen.getByText(HELP_TITLE)).toBeInTheDocument();

    fireEvent.keyDown(screen.getByText(HELP_TITLE), { key: "Shift" });
    expect(screen.getByText(HELP_TITLE)).toBeInTheDocument();

    fireEvent.keyDown(screen.getByText(HELP_TITLE), { key: "Enter" });
    // MUI's Drawer keeps its content mounted through its exit transition
    // (Slide, ~225ms) rather than unmounting the instant `expanded` flips --
    // same reason routing.test.tsx has to await the landing dialog's close.
    // Real timers are in effect here (no vi.useFakeTimers), so waitFor's
    // polling naturally spans that transition.
    await waitFor(() => {
      expect(screen.queryByText(HELP_TITLE)).not.toBeInTheDocument();
    });
  });
});
