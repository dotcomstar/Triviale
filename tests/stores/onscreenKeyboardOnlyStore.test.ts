import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// onscreenKeyboardOnlyStore reads localStorage and computes `fromToday` at
// module load time (via useDailyIndex), so each case needs a fresh module
// instance loaded under a known system time and localStorage state.
describe("onscreenKeyboardOnlyStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 10, 23)); // useDailyIndex() === 8 on this date
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults onscreenKeyboardOnly to false when there is no saved game to match today", async () => {
    localStorage.setItem("onscreenKeyboardOnly", "true");
    vi.resetModules();
    const { default: useOnscreenKeyboardOnlyStore } = await import(
      "../../src/stores/onscreenKeyboardOnlyStore"
    );
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      false
    );
  });

  it("defaults onscreenKeyboardOnly to false when the saved game is from a different day", async () => {
    localStorage.setItem("onscreenKeyboardOnly", "true");
    localStorage.setItem("prevGame", JSON.stringify({ pastOffset: 999 }));
    vi.resetModules();
    const { default: useOnscreenKeyboardOnlyStore } = await import(
      "../../src/stores/onscreenKeyboardOnlyStore"
    );
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      false
    );
  });

  it("restores onscreenKeyboardOnly when the saved game matches today's index", async () => {
    localStorage.setItem("onscreenKeyboardOnly", "true");
    localStorage.setItem("prevGame", JSON.stringify({ pastOffset: 8 }));
    vi.resetModules();
    const { default: useOnscreenKeyboardOnlyStore } = await import(
      "../../src/stores/onscreenKeyboardOnlyStore"
    );
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      true
    );
  });

  it("toggleOnscreenKeyboardOnly flips the state and persists it to localStorage", async () => {
    vi.resetModules();
    const { default: useOnscreenKeyboardOnlyStore } = await import(
      "../../src/stores/onscreenKeyboardOnlyStore"
    );
    useOnscreenKeyboardOnlyStore.getState().toggleOnscreenKeyboardOnly();
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      true
    );
    expect(localStorage.getItem("onscreenKeyboardOnly")).toBe("true");

    useOnscreenKeyboardOnlyStore.getState().toggleOnscreenKeyboardOnly();
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      false
    );
    expect(localStorage.getItem("onscreenKeyboardOnly")).toBe("false");
  });

  it("defaults onscreenKeyboardOnly to false instead of throwing when prevGame is malformed JSON", async () => {
    localStorage.setItem("onscreenKeyboardOnly", "true");
    localStorage.setItem("prevGame", "{not valid json");
    vi.resetModules();
    const { default: useOnscreenKeyboardOnlyStore } = await import(
      "../../src/stores/onscreenKeyboardOnlyStore"
    );
    expect(useOnscreenKeyboardOnlyStore.getState().onscreenKeyboardOnly).toBe(
      false
    );
  });
});
