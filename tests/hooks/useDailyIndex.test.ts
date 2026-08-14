import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("getPositiveIndex", () => {
  it("returns the index unchanged when already in range", async () => {
    const { getPositiveIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    expect(getPositiveIndex(1)).toBe(1);
  });

  it("returns zero for an index of zero", async () => {
    const { getPositiveIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    expect(getPositiveIndex(0)).toBe(0);
  });

  it("wraps a negative index to the end of the range", async () => {
    const { getPositiveIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    const { default: questions } = await import("../../src/data/questions");
    expect(getPositiveIndex(-1)).toBe(questions.length - 1);
  });

  it("wraps an index equal to the length back to zero", async () => {
    const { getPositiveIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    const { default: questions } = await import("../../src/data/questions");
    expect(getPositiveIndex(questions.length)).toBe(0);
  });

  it("wraps an index that is a negative multiple of the length back to zero", async () => {
    const { getPositiveIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    const { default: questions } = await import("../../src/data/questions");
    expect(getPositiveIndex(-questions.length)).toBe(0);
  });
});

// useDailyIndex reads `new Date()` at module load time (not inside the
// function), so each case needs a fresh module instance loaded under a
// faked system time.
describe("useDailyIndex", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("computes the day offset from the game epoch, adjusted by MANUAL_OFFSET", async () => {
    // One day after the Nov 22 2024 epoch. MANUAL_OFFSET (-9) shifts
    // "today" 9 days earlier to Nov 14, which is 8 days before the epoch.
    vi.setSystemTime(new Date(2024, 10, 23));
    vi.resetModules();
    const { default: useDailyIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    expect(useDailyIndex()).toBe(8);
  });

  it("returns a negative index once far enough past the epoch", async () => {
    // 30 days after the epoch. Shifted 9 days earlier to Dec 13, which is
    // 21 days after the epoch.
    vi.setSystemTime(new Date(2024, 11, 22));
    vi.resetModules();
    const { default: useDailyIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    expect(useDailyIndex()).toBe(-21);
  });

  it("returns zero on epoch day once MANUAL_OFFSET is accounted for", async () => {
    // Exactly 9 days after the epoch: shifting 9 days earlier via
    // MANUAL_OFFSET lands "today" back on the epoch itself.
    vi.setSystemTime(new Date(2024, 11, 1));
    vi.resetModules();
    const { default: useDailyIndex } = await import(
      "../../src/hooks/useDailyIndex"
    );
    expect(useDailyIndex()).toBe(0);
  });
});
