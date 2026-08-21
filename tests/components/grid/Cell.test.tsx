import { useTheme } from "@mui/material";
import { act, render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Cell from "../../../src/components/grid/Cell";
import { SKIP_LETTER } from "../../../src/constants/strings";
import {
  FLIP_ANIMATION_MS,
  PULSE_TYPE_MS,
  REVEAL_TIME_MS,
  WAVE_BOUNCE_MS,
} from "../../../src/constants/settings";

// Cell/GameRow compare `status === theme.palette.X` by strict reference, and
// tests render with no ThemeProvider, so useTheme() resolves to MUI's
// default-theme singleton. Grabbing that same singleton here (rather than a
// fresh createTheme()) is required for status props to `===`-match what
// Cell's own useTheme() call returns internally.
const { result } = renderHook(() => useTheme());
const theme = result.current;

// tests/setup.ts's matchMedia polyfill always returns matches: false, which
// is what makes every animation test below exercise the "motion allowed"
// path by default. This override lets the reduced-motion tests flip just
// the prefers-reduced-motion query, without disturbing MOBILE_SCREEN_CUTOFF
// (also read via useMediaQuery in the same component).
const mockPrefersReducedMotion = (matches: boolean) => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? matches : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
  return () => {
    window.matchMedia = original;
  };
};

describe("Cell", () => {
  it("renders an empty cell with no status text and no filled class", () => {
    render(<Cell nthLetter={5} />);
    const cell = document.querySelector('[aria-label="5th letter, empty"]');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute("aria-live", "off");
    expect(cell?.className).not.toContain("Triviale-filled");
  });

  it("renders a filled cell with a value and the filled class, no status suffix", () => {
    render(<Cell nthLetter={2} value="A" />);
    const cell = document.querySelector('[aria-label="2nd letter, A"]');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute("aria-live", "polite");
    expect(cell?.className).toContain("Triviale-filled");
  });

  it("uses the skipped label instead of the literal skip character", () => {
    render(<Cell nthLetter={3} value={SKIP_LETTER} />);
    expect(
      document.querySelector('[aria-label="3rd letter, skipped"]')
    ).toBeInTheDocument();
  });

  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
  ])("picks the %s ordinal suffix for nthLetter=%i", (nthLetter, expected) => {
    render(<Cell nthLetter={nthLetter} value="A" />);
    expect(
      document.querySelector(`[aria-label="${expected} letter, A"]`)
    ).toBeInTheDocument();
  });

  it("appends the correct status description for success/warning/error", () => {
    const { rerender } = render(
      <Cell nthLetter={1} value="A" status={theme.palette.success} />
    );
    expect(
      document.querySelector('[aria-label="1st letter, A, correct"]')
    ).toBeInTheDocument();

    rerender(<Cell nthLetter={1} value="A" status={theme.palette.warning} />);
    expect(
      document.querySelector(
        '[aria-label="1st letter, A, present in another position"]'
      )
    ).toBeInTheDocument();

    rerender(<Cell nthLetter={1} value="A" status={theme.palette.error} />);
    expect(
      document.querySelector('[aria-label="1st letter, A, absent"]')
    ).toBeInTheDocument();
  });

  it("renders no visible border when a status is set and no override is given", () => {
    render(<Cell nthLetter={1} value="A" status={theme.palette.error} />);
    const cell = document.querySelector('[aria-label="1st letter, A, absent"]');
    expect(cell).toHaveStyle({ borderStyle: "none" });
  });

  it("renders a solid border in the override color, even when a status is set", () => {
    render(
      <Cell
        nthLetter={1}
        value="A"
        status={theme.palette.error}
        borderColorOverride="rgb(0, 128, 0)"
      />
    );
    const cell = document.querySelector('[aria-label="1st letter, A, absent"]');
    expect(cell).toHaveStyle({
      borderStyle: "solid",
      borderWidth: "2px",
      borderColor: "rgb(0, 128, 0)",
    });
  });
});

describe("Cell typing pop", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not pop on initial mount, even when already filled", () => {
    render(<Cell nthLetter={1} value="A" />);
    const cell = document.querySelector('[aria-label^="1st letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
  });

  it("pops when a letter is typed into a previously empty slot", () => {
    vi.useFakeTimers();
    const { rerender } = render(<Cell nthLetter={1} />);
    rerender(<Cell nthLetter={1} value="A" />);
    // The pop is applied via an off -> on state flip (a 0ms timeout) so it
    // can restart on every retype, not just the first -- advance past it.
    act(() => {
      vi.advanceTimersByTime(0);
    });
    const cell = document.querySelector('[aria-label^="1st letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toContain(
      `${PULSE_TYPE_MS}ms ease-out`
    );
  });

  it("does not pop when prefers-reduced-motion is set", () => {
    const restore = mockPrefersReducedMotion(true);
    vi.useFakeTimers();
    const { rerender } = render(<Cell nthLetter={1} />);
    rerender(<Cell nthLetter={1} value="A" />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    const cell = document.querySelector('[aria-label^="1st letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
    restore();
  });
});

describe("Cell submit flip + color reveal", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not flip when a past guess mounts with a status already set", () => {
    render(<Cell nthLetter={1} value="A" status={theme.palette.success} />);
    const cell = document.querySelector('[aria-label^="1st letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
  });

  it("flips on a live status reveal, staggered by nthLetter, and holds the old color until the midpoint", () => {
    vi.useFakeTimers();
    const nthLetter = 3;
    const { rerender } = render(<Cell nthLetter={nthLetter} value="A" />);
    const cell = () =>
      document.querySelector('[aria-label^="3rd letter, A"]') as Element;
    const colorBeforeReveal = getComputedStyle(cell()).backgroundColor;

    rerender(
      <Cell nthLetter={nthLetter} value="A" status={theme.palette.success} />
    );
    expect(getComputedStyle(cell()).animation).toContain(
      `${FLIP_ANIMATION_MS}ms ease-in-out ${REVEAL_TIME_MS * (nthLetter - 1)}ms`
    );
    // Not revealed yet -- still shows the pre-flip color right up to the
    // midpoint of this cell's (staggered) flip.
    const midpoint =
      REVEAL_TIME_MS * (nthLetter - 1) + FLIP_ANIMATION_MS / 2;
    act(() => {
      vi.advanceTimersByTime(midpoint - 1);
    });
    expect(getComputedStyle(cell()).backgroundColor).toBe(colorBeforeReveal);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(getComputedStyle(cell()).backgroundColor).not.toBe(
      colorBeforeReveal
    );
  });

  it("reveals the status immediately, with no flip, under prefers-reduced-motion", () => {
    const restore = mockPrefersReducedMotion(true);
    const { rerender } = render(<Cell nthLetter={1} value="A" />);
    const cell = () =>
      document.querySelector('[aria-label^="1st letter, A"]') as Element;
    const colorBeforeReveal = getComputedStyle(cell()).backgroundColor;

    rerender(<Cell nthLetter={1} value="A" status={theme.palette.success} />);
    expect(getComputedStyle(cell()).animation).toBe("none");
    expect(getComputedStyle(cell()).backgroundColor).not.toBe(
      colorBeforeReveal
    );
    restore();
  });

  it("never flips a skipped guess (its status stays undefined)", () => {
    // GameGrid's getStatuses returns undefined entirely for a skipped
    // guess, so a skipped Cell never receives a defined status prop and
    // this component-level behavior alone keeps it flip-free.
    render(<Cell nthLetter={1} value={SKIP_LETTER} />);
    const cell = document.querySelector('[aria-label^="1st letter"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
  });
});

describe("Cell win bounce", () => {
  it("applies the bounce with the given delay when winBounceDelayMs is set", () => {
    render(<Cell nthLetter={2} value="A" winBounceDelayMs={250} />);
    const cell = document.querySelector('[aria-label^="2nd letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toContain(
      `${WAVE_BOUNCE_MS}ms ease-out 250ms`
    );
  });

  it("does not bounce when winBounceDelayMs is not set", () => {
    render(<Cell nthLetter={2} value="A" />);
    const cell = document.querySelector('[aria-label^="2nd letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
  });

  it("does not bounce under prefers-reduced-motion, even when winBounceDelayMs is set", () => {
    const restore = mockPrefersReducedMotion(true);
    render(<Cell nthLetter={2} value="A" winBounceDelayMs={250} />);
    const cell = document.querySelector('[aria-label^="2nd letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
    restore();
  });
});
