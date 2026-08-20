import { beforeEach, describe, expect, it, vi } from "vitest";

// highContrastStore reads localStorage at module load time (no fromToday
// day-gate, unlike hardModeStore/onscreenKeyboardOnlyStore -- see the
// 08-17 review's "already solid" note), so each case needs a fresh module
// instance loaded under a known localStorage state, same pattern as
// tests/stores/hardModeStore.test.ts.
describe("highContrastStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults highContrast to true when localStorage has the exact string \"true\"", async () => {
    localStorage.setItem("highContrast", "true");
    vi.resetModules();
    const { default: useHighContrastStore } = await import(
      "../../src/stores/highContrastStore"
    );
    expect(useHighContrastStore.getState().highContrast).toBe(true);
  });

  it("defaults highContrast to false when there is no saved value", async () => {
    vi.resetModules();
    const { default: useHighContrastStore } = await import(
      "../../src/stores/highContrastStore"
    );
    expect(useHighContrastStore.getState().highContrast).toBe(false);
  });

  it("defaults highContrast to false for the literal string \"false\"", async () => {
    localStorage.setItem("highContrast", "false");
    vi.resetModules();
    const { default: useHighContrastStore } = await import(
      "../../src/stores/highContrastStore"
    );
    expect(useHighContrastStore.getState().highContrast).toBe(false);
  });

  it("defaults highContrast to false for a non-exact value, since the comparison is strict (e.g. \"TRUE\")", async () => {
    localStorage.setItem("highContrast", "TRUE");
    vi.resetModules();
    const { default: useHighContrastStore } = await import(
      "../../src/stores/highContrastStore"
    );
    expect(useHighContrastStore.getState().highContrast).toBe(false);
  });

  it("toggleHighContrast flips the state and persists the string back to localStorage", async () => {
    vi.resetModules();
    const { default: useHighContrastStore } = await import(
      "../../src/stores/highContrastStore"
    );
    useHighContrastStore.getState().toggleHighContrast();
    expect(useHighContrastStore.getState().highContrast).toBe(true);
    expect(localStorage.getItem("highContrast")).toBe("true");

    useHighContrastStore.getState().toggleHighContrast();
    expect(useHighContrastStore.getState().highContrast).toBe(false);
    expect(localStorage.getItem("highContrast")).toBe("false");
  });
});
