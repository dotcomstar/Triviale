import { Stack, useTheme } from "@mui/material";
import { SKIPPED_TEXT } from "../../constants/strings";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useQuestionByID from "../../hooks/useQuestionByID";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import GameRow from "./GameRow";

const GameGrid = () => {
  const dailyIndex = useDailyIndex();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const question = useQuestionByID(safeIndex);
  const answerWithSpaces = question?.answer.toLocaleUpperCase()!;
  const answer = answerWithSpaces.replace(/\s+/g, "")!;
  const currGuess = useCurrGuessStore((s) => s.guess);
  const guesses = useGameStateStore((s) => s.guesses);
  const theme = useTheme();

  // TODO: Memoize and possibly export this function?
  const getStatuses = (guess: string[]) => {
    const answerArr = answer.split("");
    const statuses = Array(guess.length).fill(theme.palette.error); // Fill with 'incorrect' color by default
    if (guess.includes(SKIPPED_TEXT)) {
      // Don't compute if the guess was skipped.
      return;
    }
    const count = new Map();
    // Get count of all chars in answer
    // TODO: Compute only once and pass deep copy as param
    for (let i = 0; i < answer.length; i++) {
      let currKey = answer[i];
      let currCount = count.get(currKey);
      if (currCount) {
        count.set(currKey, currCount + 1);
      } else {
        count.set(currKey, 1);
      }
    }
    // Set all correct chars
    for (let i = 0; i < guess.length; i++) {
      let currChar = guess[i];
      let currCount: number = count.get(currChar);
      if (currChar === answerArr[i]) {
        statuses[i] = theme.palette.success;
        count.set(currChar, currCount - 1);
      }
    }
    // Set all containing but in the wrong position chars
    for (let i = 0; i < guess.length; i++) {
      let currChar = guess[i];
      let currCount: number = count.get(currChar);
      if (currCount && currCount > 0 && statuses[i] === theme.palette.error) {
        statuses[i] = theme.palette.warning;
        count.set(currChar, currCount - 1);
      }
    }
    return statuses;
  };

  return (
    <Stack direction={"column"} spacing={1}>
      {guesses.map(
        (q, i) =>
          i === questionNumber
            ? q.map((g, gi) =>
                gi === guessNumber[i] ? (
                  // Current guess
                  <GameRow guess={currGuess} key={gi} />
                ) : (
                  // Past guesses
                  <GameRow guess={g} key={gi} statuses={getStatuses(g)} />
                )
              )
            : null // Don't render rows for the non-active question
      )}
    </Stack>
  );
};

export default GameGrid;
