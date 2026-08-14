import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// hardModeStore reads localStorage and computes `fromToday` at module load
// time (via useDailyIndex), so each case needs a fresh module instance
// loaded under a known system time and localStorage state.
describe("hardModeStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 10, 23)); // useDailyIndex() === 8 on this date
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults hardMode to false when there is no saved game to match today", async () => {
    localStorage.setItem("hardMode", "true");
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    expect(useHardModeStore.getState().hardMode).toBe(false);
  });

  it("defaults hardMode to false when the saved game is from a different day", async () => {
    localStorage.setItem("hardMode", "true");
    localStorage.setItem("prevGame", JSON.stringify({ pastOffset: 999 }));
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    expect(useHardModeStore.getState().hardMode).toBe(false);
  });

  it("restores hardMode when the saved game matches today's index", async () => {
    localStorage.setItem("hardMode", "true");
    localStorage.setItem("prevGame", JSON.stringify({ pastOffset: 8 }));
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    expect(useHardModeStore.getState().hardMode).toBe(true);
  });

  it("keeps hardMode false when the saved game matches today but hardMode wasn't set", async () => {
    localStorage.setItem("prevGame", JSON.stringify({ pastOffset: 8 }));
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    expect(useHardModeStore.getState().hardMode).toBe(false);
  });

  it("toggleHardMode flips the state and persists it to localStorage", async () => {
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    useHardModeStore.getState().toggleHardMode();
    expect(useHardModeStore.getState().hardMode).toBe(true);
    expect(localStorage.getItem("hardMode")).toBe("true");

    useHardModeStore.getState().toggleHardMode();
    expect(useHardModeStore.getState().hardMode).toBe(false);
    expect(localStorage.getItem("hardMode")).toBe("false");
  });

  it("setHardMode sets the state explicitly and persists it to localStorage", async () => {
    vi.resetModules();
    const { default: useHardModeStore } = await import(
      "../../src/stores/hardModeStore"
    );
    useHardModeStore.getState().setHardMode(true);
    expect(useHardModeStore.getState().hardMode).toBe(true);
    expect(localStorage.getItem("hardMode")).toBe("true");
  });
});
