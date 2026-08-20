import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProgressBar from "../../../src/components/progressBar/ProgressBar";
import { MAX_CHALLENGES } from "../../../src/constants/settings";
import { PROGRESS_BUTTON_TEXT } from "../../../src/constants/strings";
import questions from "../../../src/data/questions";
import useDailyIndex, {
  getPositiveIndex,
} from "../../../src/hooks/useDailyIndex";
import useCurrGuessStore from "../../../src/stores/currGuessStore";
import useGameStateStore from "../../../src/stores/gameStateStore";

// ProgressBar and this test both call the same (module-singleton)
// useDailyIndex, so this stays consistent with whatever ProgressBar
// renders without needing to control "today". Computed once at module
// scope to match the pattern already used in hardModeStore.ts.
// eslint-disable-next-line react-hooks/rules-of-hooks
const dailyIndex = useDailyIndex();
// Button labels go through the same PROGRESS_BUTTON_TEXT formatter
// ProgressBar itself uses, which prepends "Q<n>, " once QUESTIONS_PER_DAY > 1.
const expectedButtonName = (questionIndex: number) =>
  PROGRESS_BUTTON_TEXT(
    questionIndex + 1,
    questions[getPositiveIndex(dailyIndex + questionIndex)].category
  );

describe("ProgressBar", () => {
  beforeEach(() => {
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
  });

  it("renders a button labeled with today's question category", () => {
    render(<ProgressBar />);
    expect(
      screen.getByRole("button", { name: expectedButtonName(0) })
    ).toBeInTheDocument();
  });

  it("renders one button per question, each labeled with its own category", () => {
    render(<ProgressBar />);
    expect(
      screen.getByRole("button", { name: expectedButtonName(1) })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: expectedButtonName(2) })
    ).toBeInTheDocument();
  });

  it("moves to the clicked question and imports its cached guess", () => {
    useGameStateStore.getState().cacheGuess(["a", "b", "c"]);
    render(<ProgressBar />);

    fireEvent.click(
      screen.getByRole("button", { name: expectedButtonName(0) })
    );

    expect(useGameStateStore.getState().questionNumber).toBe(0);
    expect(useCurrGuessStore.getState().guess).toEqual(["a", "b", "c"]);
  });

  it("does not throw when clicking a finished question's tab (guessNumber at MAX_CHALLENGES)", () => {
    // Losing a question (or winning on the last guess) leaves
    // guessNumber[i] === MAX_CHALLENGES, one past guesses[i]'s last valid
    // index -- guesses[i][MAX_CHALLENGES] is undefined.
    for (let g = 0; g < MAX_CHALLENGES; g++) {
      useGameStateStore.getState().makeGuess(["x"]);
    }
    render(<ProgressBar />);

    expect(() =>
      fireEvent.click(
        screen.getByRole("button", { name: expectedButtonName(0) })
      )
    ).not.toThrow();
    expect(useCurrGuessStore.getState().guess).toEqual([]);
  });

  it("does not throw when guesses is shorter than QUESTIONS_PER_DAY (shape-mismatched import)", () => {
    // A hand-edited or stale-shape "prevGame" in localStorage can hand
    // importGame a guesses array shorter than QUESTIONS_PER_DAY, leaving
    // guesses[i] undefined for later questions -- both the render body's
    // .reduce() and the click handler's index into it need to tolerate that.
    useGameStateStore.setState({ guesses: [[["a"]]] });

    expect(() => render(<ProgressBar />)).not.toThrow();

    expect(() =>
      fireEvent.click(
        screen.getByRole("button", { name: expectedButtonName(1) })
      )
    ).not.toThrow();
    expect(useCurrGuessStore.getState().guess).toEqual([]);
  });
});
