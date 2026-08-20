import { useTheme } from "@mui/material";
import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Cell from "../../../src/components/grid/Cell";
import { SKIP_LETTER } from "../../../src/constants/strings";

// Cell/GameRow compare `status === theme.palette.X` by strict reference, and
// tests render with no ThemeProvider, so useTheme() resolves to MUI's
// default-theme singleton. Grabbing that same singleton here (rather than a
// fresh createTheme()) is required for status props to `===`-match what
// Cell's own useTheme() call returns internally.
const { result } = renderHook(() => useTheme());
const theme = result.current;

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
