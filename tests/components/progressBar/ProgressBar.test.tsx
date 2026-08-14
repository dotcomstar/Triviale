import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProgressBar from "../../../src/components/progressBar/ProgressBar";
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
const expectedCategory = () =>
  questions[getPositiveIndex(dailyIndex)].category;

describe("ProgressBar", () => {
  beforeEach(() => {
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
  });

  it("renders a button labeled with today's question category", () => {
    render(<ProgressBar />);
    expect(
      screen.getByRole("button", { name: expectedCategory() })
    ).toBeInTheDocument();
  });

  it("moves to the clicked question and imports its cached guess", () => {
    useGameStateStore.getState().cacheGuess(["a", "b", "c"]);
    render(<ProgressBar />);

    fireEvent.click(screen.getByRole("button", { name: expectedCategory() }));

    expect(useGameStateStore.getState().questionNumber).toBe(0);
    expect(useCurrGuessStore.getState().guess).toEqual(["a", "b", "c"]);
  });
});
