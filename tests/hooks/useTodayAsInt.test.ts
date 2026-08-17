import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// useTodayAsInt reads `new Date()` at module load time (not inside the
// function), so each case needs a fresh module instance loaded under a
// faked system time.
describe("useTodayAsInt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats a double-digit month and day as YYYYMMDD", async () => {
    vi.setSystemTime(new Date(2024, 10, 22)); // Nov 22 2024
    vi.resetModules();
    const { default: useTodayAsInt } = await import(
      "../../src/hooks/useTodayAsInt"
    );
    expect(useTodayAsInt()).toBe(20241122);
  });

  it("pads a single-digit month and day correctly", async () => {
    vi.setSystemTime(new Date(2025, 0, 5)); // Jan 5 2025
    vi.resetModules();
    const { default: useTodayAsInt } = await import(
      "../../src/hooks/useTodayAsInt"
    );
    expect(useTodayAsInt()).toBe(20250105);
  });

  it("handles a double-digit month with a double-digit day at year end", async () => {
    vi.setSystemTime(new Date(2023, 11, 31)); // Dec 31 2023
    vi.resetModules();
    const { default: useTodayAsInt } = await import(
      "../../src/hooks/useTodayAsInt"
    );
    expect(useTodayAsInt()).toBe(20231231);
  });
});
