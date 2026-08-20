import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ExpandableText from "../../../src/components/question/ExpandableText";
import { MAX_CHALLENGES } from "../../../src/constants/settings";
import {
  NEXT_QUESTIONS_WIN_TEXT,
  NUMBER_CORRECT_TEXT,
  SKIP_BUTTON_TEXT,
  SKIP_LETTER,
  WIN_MESSAGE_TEXT,
} from "../../../src/constants/strings";
import useCurrGuessStore from "../../../src/stores/currGuessStore";
import useDialogStore from "../../../src/stores/dialogStore";
import useGameStateStore from "../../../src/stores/gameStateStore";
import useHardModeStore from "../../../src/stores/hardModeStore";
import useOnscreenKeyboardOnlyStore from "../../../src/stores/onscreenKeyboardOnlyStore";
import useRetrievedStore from "../../../src/stores/retrievedStore";

// A 50-char string divides evenly by MAX_CHALLENGES (5), so the truncation
// math (children.length / MAX_CHALLENGES) lands on whole-character slices
// instead of a fractional index.
const CHILDREN = "0123456789".repeat(5);
const SLICE_LEN = CHILDREN.length / MAX_CHALLENGES;

describe("ExpandableText", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(Math, "random").mockReturnValue(0); // pins WIN_MESSAGES[0]
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
    useDialogStore.setState(useDialogStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
    useOnscreenKeyboardOnlyStore.setState(
      useOnscreenKeyboardOnlyStore.getInitialState(),
      true
    );
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    // Forces safeIndex === questionNumber (the GameGrid.test.tsx precedent) --
    // questions[0].answer is "Johannesburg", 12 letters, no spaces to strip.
    useRetrievedStore.getState().setRetrieved(true);
  });

  describe("summary truncation", () => {
    it("shows a growing prefix of the question while in progress", () => {
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      expect(
        screen.getByText(CHILDREN.substring(0, SLICE_LEN) + "...")
      ).toBeInTheDocument();
    });

    it("grows the revealed prefix by one guess-worth of characters per guess", () => {
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      fireEvent.click(screen.getByRole("button", { name: SKIP_BUTTON_TEXT }));
      expect(
        screen.getByText(CHILDREN.substring(0, SLICE_LEN * 2) + "...")
      ).toBeInTheDocument();
    });

    it("shows the full text once the question is no longer in progress, regardless of guess count", () => {
      useGameStateStore.getState().winQuestion(0);
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      expect(screen.getByText(CHILDREN)).toBeInTheDocument();
      expect(
        screen.queryByText(CHILDREN.substring(0, SLICE_LEN) + "...")
      ).not.toBeInTheDocument();
    });
  });

  describe("skip button", () => {
    it("normal mode: burns answer.length skip letters and resets the current guess", () => {
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      fireEvent.click(screen.getByRole("button", { name: SKIP_BUTTON_TEXT }));

      expect(useGameStateStore.getState().guesses[0][0]).toEqual(
        Array(12).fill(SKIP_LETTER) // "Johannesburg" is 12 letters
      );
      expect(useCurrGuessStore.getState().guess).toEqual([]);
    });

    it("hard mode: an empty current guess still burns exactly one skip letter", () => {
      useHardModeStore.getState().setHardMode(true);
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      fireEvent.click(screen.getByRole("button", { name: SKIP_BUTTON_TEXT }));

      expect(useGameStateStore.getState().guesses[0][0]).toEqual([
        SKIP_LETTER,
      ]);
    });

    it("hard mode: a partially-typed guess burns that many skip letters instead", () => {
      useHardModeStore.getState().setHardMode(true);
      useCurrGuessStore.getState().addChar("A");
      useCurrGuessStore.getState().addChar("B");
      render(<ExpandableText>{CHILDREN}</ExpandableText>);
      fireEvent.click(screen.getByRole("button", { name: SKIP_BUTTON_TEXT }));

      expect(useGameStateStore.getState().guesses[0][0]).toEqual([
        SKIP_LETTER,
        SKIP_LETTER,
      ]);
    });
  });

  describe("advancing once a question is finished", () => {
    it("shows the next-question button and advances on click, while the game is still in progress", () => {
      useGameStateStore.getState().winQuestion(0);
      useCurrGuessStore.getState().addChar("Z"); // give resetGuess something to clear
      render(<ExpandableText>{CHILDREN}</ExpandableText>);

      fireEvent.click(
        screen.getByRole("button", { name: NEXT_QUESTIONS_WIN_TEXT(0) })
      );

      expect(useCurrGuessStore.getState().guess).toEqual([]);
      expect(useGameStateStore.getState().questionNumber).toBe(1);
    });
  });

  describe("game over", () => {
    it("lost: shows the correct-count label and opens stats on click", () => {
      useGameStateStore.getState().loseQuestion(0);
      useGameStateStore.getState().loseGame();
      render(<ExpandableText>{CHILDREN}</ExpandableText>);

      fireEvent.click(
        screen.getByRole("button", { name: NUMBER_CORRECT_TEXT(0) })
      );

      expect(useDialogStore.getState().isStatsOpen).toBe(true);
      // Neither the skip nor the advance-to-next-question branch fired.
      expect(useGameStateStore.getState().guesses[0][0]).toEqual([]);
    });

    it("won: shows the win-message label and opens stats on click", () => {
      useGameStateStore.getState().winQuestion(0);
      useGameStateStore.getState().winGame();
      render(<ExpandableText>{CHILDREN}</ExpandableText>);

      fireEvent.click(
        screen.getByRole("button", { name: WIN_MESSAGE_TEXT(0, 1) })
      );

      expect(useDialogStore.getState().isStatsOpen).toBe(true);
    });
  });

  it("renders nothing when children is empty", () => {
    const { container } = render(<ExpandableText>{""}</ExpandableText>);
    expect(container.firstChild).toBeNull();
  });
});
