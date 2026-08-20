import { beforeEach, describe, expect, it } from "vitest";
import useDialogStore from "../../src/stores/dialogStore";

describe("dialogStore", () => {
  beforeEach(() => {
    useDialogStore.setState(useDialogStore.getInitialState(), true);
  });

  it("starts with the landing dialog open and every other dialog closed", () => {
    // Load-bearing default: routing.test.tsx has to explicitly dismiss the
    // landing dialog on first load because it starts open.
    const state = useDialogStore.getState();
    expect(state.isLandingOpen).toBe(true);
    expect(state.isHelpOpen).toBe(false);
    expect(state.isStatsOpen).toBe(false);
    expect(state.isSettingsOpen).toBe(false);
  });

  it("setHelpOpen flips only isHelpOpen", () => {
    useDialogStore.getState().setHelpOpen(true);
    const state = useDialogStore.getState();
    expect(state.isHelpOpen).toBe(true);
    expect(state.isStatsOpen).toBe(false);
    expect(state.isSettingsOpen).toBe(false);
    expect(state.isLandingOpen).toBe(true);
  });

  it("setStatsOpen flips only isStatsOpen", () => {
    useDialogStore.getState().setStatsOpen(true);
    const state = useDialogStore.getState();
    expect(state.isStatsOpen).toBe(true);
    expect(state.isHelpOpen).toBe(false);
    expect(state.isSettingsOpen).toBe(false);
    expect(state.isLandingOpen).toBe(true);
  });

  it("setSettingsOpen flips only isSettingsOpen", () => {
    useDialogStore.getState().setSettingsOpen(true);
    const state = useDialogStore.getState();
    expect(state.isSettingsOpen).toBe(true);
    expect(state.isHelpOpen).toBe(false);
    expect(state.isStatsOpen).toBe(false);
    expect(state.isLandingOpen).toBe(true);
  });

  it("setLandingOpen flips only isLandingOpen", () => {
    useDialogStore.getState().setLandingOpen(false);
    const state = useDialogStore.getState();
    expect(state.isLandingOpen).toBe(false);
    expect(state.isHelpOpen).toBe(false);
    expect(state.isStatsOpen).toBe(false);
    expect(state.isSettingsOpen).toBe(false);
  });

  it("closeAllDialogs zeroes all four flags, including isLandingOpen", () => {
    useDialogStore.getState().setHelpOpen(true);
    useDialogStore.getState().setStatsOpen(true);
    useDialogStore.getState().setSettingsOpen(true);
    useDialogStore.getState().closeAllDialogs();
    expect(useDialogStore.getState()).toMatchObject({
      isHelpOpen: false,
      isStatsOpen: false,
      isSettingsOpen: false,
      isLandingOpen: false,
    });
  });
});
