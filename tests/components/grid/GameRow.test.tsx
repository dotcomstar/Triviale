import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import GameRow from "../../../src/components/grid/GameRow";
import { WAVE_STEP_MS } from "../../../src/constants/settings";
import useCurrGuessStore from "../../../src/stores/currGuessStore";
import useGameStateStore from "../../../src/stores/gameStateStore";
import useHardModeStore from "../../../src/stores/hardModeStore";
import useRetrievedStore from "../../../src/stores/retrievedStore";
import { getFlipTotalMs } from "../../../src/utils/animationTiming";

describe("GameRow", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
  });

  it("uses answerOverride's length instead of the real active question's", () => {
    // The real active question (index 0, "Johannesburg") is 12 letters, but
    // answerOverride should drive rendering instead - "New York" is 7
    // letters once the space is stripped.
    render(<GameRow answerOverride="New York" guess={["N"]} />);

    const cells = document.querySelectorAll('[aria-label*="letter"]');
    expect(cells).toHaveLength(7);
  });

  it("renders a wider gap and no bottom border at a multi-word answer's space boundary", () => {
    render(<GameRow answerOverride="New York" guess={Array.from("NEWYORK")} />);

    // "NEW" + "YORK" - the space falls after the 3rd letter.
    const thirdCell = document.querySelector('[aria-label="3rd letter, W"]');
    const firstCell = document.querySelector('[aria-label="1st letter, N"]');
    expect(thirdCell).not.toBeNull();
    expect(firstCell).not.toBeNull();

    const boundaryDivider = thirdCell?.nextElementSibling;
    const normalDivider = firstCell?.nextElementSibling;

    expect(boundaryDivider).toHaveStyle({ width: "10px", borderBottomWidth: "0px" });
    expect(normalDivider).toHaveStyle({ width: "5px" });
  });

  it("renders one fewer empty cell for a past guess than the current guess in hard mode", () => {
    useHardModeStore.getState().setHardMode(true);

    const { unmount } = render(
      <GameRow guess={["A"]} answerOverride={undefined} isPastGuess={false} />
    );
    const currentGuessEmptyCells =
      document.querySelectorAll('[aria-label="2nd letter, empty"]').length;
    unmount();

    render(<GameRow guess={["A"]} answerOverride={undefined} isPastGuess={true} />);
    const pastGuessEmptyCells =
      document.querySelectorAll('[aria-label="2nd letter, empty"]').length;

    expect(currentGuessEmptyCells).toBe(1);
    expect(pastGuessEmptyCells).toBe(0);
  });

  it("gives each letter of a winning row a bounce delay staggered after the row's total flip time", () => {
    render(<GameRow guess={["C", "A", "T"]} isWinningRow answerOverride="CAT" />);

    const cellAnimation = (label: string) =>
      getComputedStyle(
        document.querySelector(`[aria-label^="${label}"]`) as Element
      ).animation;

    const flipTotal = getFlipTotalMs(3);
    expect(cellAnimation("1st letter, C")).toContain(`${flipTotal}ms`);
    expect(cellAnimation("2nd letter, A")).toContain(
      `${flipTotal + WAVE_STEP_MS}ms`
    );
    expect(cellAnimation("3rd letter, T")).toContain(
      `${flipTotal + WAVE_STEP_MS * 2}ms`
    );
  });

  it("does not bounce a non-winning row's letters", () => {
    render(<GameRow guess={["C", "A", "T"]} answerOverride="CAT" />);

    const cell = document.querySelector('[aria-label^="1st letter, C"]');
    expect(getComputedStyle(cell as Element).animation).toBe("none");
  });
});
