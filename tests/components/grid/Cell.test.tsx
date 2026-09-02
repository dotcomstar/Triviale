import { ThemeProvider, createTheme } from "@mui/material";
import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Cell from "../../../src/components/grid/Cell";
import { SKIP_LETTER } from "../../../src/constants/strings";
import {
  FLIP_ANIMATION_MS,
  PULSE_TYPE_MS,
  REVEAL_TIME_MS,
  WAVE_BOUNCE_MS,
} from "../../../src/constants/settings";

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
      <Cell nthLetter={1} value="A" status="success" />
    );
    expect(
      document.querySelector('[aria-label="1st letter, A, correct"]')
    ).toBeInTheDocument();

    rerender(<Cell nthLetter={1} value="A" status="warning" />);
    expect(
      document.querySelector(
        '[aria-label="1st letter, A, present in another position"]'
      )
    ).toBeInTheDocument();

    rerender(<Cell nthLetter={1} value="A" status="error" />);
    expect(
      document.querySelector('[aria-label="1st letter, A, absent"]')
    ).toBeInTheDocument();
  });

  it("renders no visible border when a status is set and no override is given", () => {
    render(<Cell nthLetter={1} value="A" status="error" />);
    const cell = document.querySelector('[aria-label="1st letter, A, absent"]');
    expect(cell).toHaveStyle({ borderStyle: "none" });
  });

  it("renders a solid border in the override color, even when a status is set", () => {
    render(
      <Cell
        nthLetter={1}
        value="A"
        status="error"
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
    render(<Cell nthLetter={1} value="A" status="success" />);
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
      <Cell nthLetter={nthLetter} value="A" status="success" />
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

    rerender(<Cell nthLetter={1} value="A" status="success" />);
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
  it("plays a live winning reveal as a flip followed by a delayed bounce", () => {
    const { rerender } = render(
      <Cell nthLetter={2} value="A" winBounceDelayMs={250} />
    );
    const cell = document.querySelector('[aria-label^="2nd letter, A"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");

    rerender(
      <Cell
        nthLetter={2}
        value="A"
        status="success"
        winBounceDelayMs={250}
      />
    );
    const animation = getComputedStyle(cell as Element).animation;
    expect(animation).toContain(
      `${FLIP_ANIMATION_MS}ms ease-in-out ${REVEAL_TIME_MS}ms`
    );
    expect(animation).toContain(
      `${WAVE_BOUNCE_MS}ms ease-out 250ms`
    );
  });

  it("does not replay a bounce when a scored winning cell mounts", () => {
    render(
      <Cell
        nthLetter={2}
        value="A"
        status="success"
        winBounceDelayMs={250}
      />
    );
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

describe("Cell theme changes", () => {
  const lightTheme = createTheme({
    palette: { success: { main: "#6AAA64" } },
  });
  const darkTheme = createTheme({
    palette: { success: { main: "#538D4E" } },
  });

  it("recolors an already-scored tile when the theme's palette changes", () => {
    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <Cell nthLetter={1} value="A" status="success" />
      </ThemeProvider>
    );
    const cell = () =>
      document.querySelector('[aria-label^="1st letter, A"]') as Element;
    expect(getComputedStyle(cell()).backgroundColor).toBe(
      "rgb(106, 170, 100)"
    );

    // ThemedLayout rebuilds the theme in place on a dark-mode / colorblind
    // toggle -- the Cell is not remounted, it just sees a new theme.
    rerender(
      <ThemeProvider theme={darkTheme}>
        <Cell nthLetter={1} value="A" status="success" />
      </ThemeProvider>
    );
    expect(getComputedStyle(cell()).backgroundColor).toBe(
      "rgb(83, 141, 78)"
    );
  });

  it("follows a status change on an already-revealed tile without flipping", () => {
    const { rerender } = render(
      <Cell nthLetter={1} value="A" status="success" />
    );
    const cell = () =>
      document.querySelector('[aria-label^="1st letter, A"]') as Element;
    const successColor = getComputedStyle(cell()).backgroundColor;

    rerender(<Cell nthLetter={1} value="A" status="error" />);
    expect(
      document.querySelector('[aria-label="1st letter, A, absent"]')
    ).toBeInTheDocument();
    expect(getComputedStyle(cell()).backgroundColor).not.toBe(successColor);
    expect(getComputedStyle(cell()).animation).toBe("none");
  });
});
