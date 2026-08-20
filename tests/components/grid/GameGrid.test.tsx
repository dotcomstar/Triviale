import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GameGrid from "../../../src/components/grid/GameGrid";
import { SKIP_LETTER } from "../../../src/constants/strings";
import useCurrGuessStore from "../../../src/stores/currGuessStore";
import useGameStateStore from "../../../src/stores/gameStateStore";
import useHardModeStore from "../../../src/stores/hardModeStore";
import useRetrievedStore from "../../../src/stores/retrievedStore";

// No question in src/data/questions.ts has `addOns` set, so the hard-mode
// addOn-acceptance regression test below needs one. Replacing index 1
// ("Rainforest") rather than appending keeps every other test in this file
// (which uses the default questionNumber=0 -> "Johannesburg") unaffected,
// and keeps questionNumber in-bounds for gameStateStore's fixed-length-3
// guesses/guessNumber arrays.
vi.mock("../../../src/data/questions", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../../src/data/questions")>();
  return {
    ...actual,
    default: actual.default.map((q, i) =>
      i === 1
        ? {
            question: "Mock question for addOn testing",
            answer: "Picasso",
            addOns: ["The"],
            category: "ART",
          }
        : q
    ),
  };
});

describe("GameGrid", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
  });

  it("does not classify a skipped guess as all-wrong (regression: guess.includes(SKIP_LETTER))", () => {
    useRetrievedStore.getState().setRetrieved(true);
    // "JOHANNESBURG" is 12 letters.
    useGameStateStore.getState().makeGuess(Array(12).fill(SKIP_LETTER));

    render(<GameGrid />);

    // Every letter of the skipped guess renders with the "skipped" label
    // (Cell.tsx converts SKIP_LETTER to SKIPPED_TEXT regardless of status),
    // but pre-fix, getStatuses ran the full algorithm against literal "-"
    // characters anyway, so those same cells also picked up an "absent"
    // status suffix. Nothing anywhere in the grid should say "absent".
    expect(document.querySelectorAll('[aria-label*="skipped"]')).toHaveLength(
      12
    );
    expect(document.querySelectorAll('[aria-label*="absent"]')).toHaveLength(
      0
    );
  });

  it("marks an exact-match past guess entirely correct", () => {
    useRetrievedStore.getState().setRetrieved(true);
    useGameStateStore.getState().makeGuess(Array.from("JOHANNESBURG"));

    render(<GameGrid />);

    expect(
      document.querySelector('[aria-label="1st letter, J, correct"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[aria-label="12th letter, G, correct"]')
    ).toBeInTheDocument();
  });

  it("marks a present-but-misplaced letter as warning and an absent letter as error", () => {
    useRetrievedStore.getState().setRetrieved(true);
    useGameStateStore.getState().makeGuess(["G", "Q", "Q", "Q", "Q"]);

    render(<GameGrid />);

    const gCell = document.querySelector('[aria-label^="1st letter, G"]');
    const qCell = document.querySelector('[aria-label^="2nd letter, Q"]');
    expect(gCell?.getAttribute("aria-label")).toContain(
      "present in another position"
    );
    expect(qCell?.getAttribute("aria-label")).toContain("absent");
  });

  it("does not apply a border-color override in normal mode, even on an exact-match guess", () => {
    useRetrievedStore.getState().setRetrieved(true);
    useGameStateStore.getState().makeGuess(Array.from("JOHANNESBURG"));

    render(<GameGrid />);

    const cell = document.querySelector('[aria-label="1st letter, J, correct"]');
    expect(cell).toHaveStyle({ borderStyle: "none" });
  });

  it("does not apply a border-color override in hard mode when the guess isn't acceptable", () => {
    useRetrievedStore.getState().setRetrieved(true);
    useHardModeStore.getState().setHardMode(true);
    useGameStateStore.getState().makeGuess(Array(12).fill("Z"));

    render(<GameGrid />);

    const cell = document.querySelector('[aria-label^="1st letter"]');
    expect(cell).toHaveStyle({ borderStyle: "none" });
  });

  it("applies the border-color override on a hard-mode guess accepted via an addOn (regression: GameRow's || / ?: precedence bug)", () => {
    useGameStateStore.getState().moveToQuestion(1);
    useRetrievedStore.getState().setRetrieved(true);
    useHardModeStore.getState().setHardMode(true);
    useGameStateStore.getState().makeGuess(Array.from("THEPICASSO"));

    render(<GameGrid />);

    const cell = document.querySelector('[aria-label^="1st letter, T"]');
    expect(cell).not.toBeNull();
    expect(cell).toHaveStyle({ borderStyle: "solid" });

    const divider = cell?.nextElementSibling;
    expect(divider).not.toBeNull();
    expect(getComputedStyle(cell as Element).borderColor).toBe(
      getComputedStyle(divider as Element).borderColor
    );
  });
});
