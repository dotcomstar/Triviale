import { Stack, useTheme } from "@mui/material";
import { SKIPPED_TEXT } from "../../constants/strings";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useQuestionByID from "../../hooks/useQuestionByID";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import GameRow from "./GameRow";
import useRetrievedStore from "../../stores/retrievedStore";

const GameGrid = () => {
  const dailyIndex = useDailyIndex();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const safeIndex = getPositiveIndex(
    questionNumber + (retrieved ? 0 : dailyIndex)
  );
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
      return; // Don't compute if the guess was skipped.
    }
    const count = new Map(); // Get count of all chars in answer
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
    for (let i = 0; i < Math.min(guess.length, answer.length); i++) {
      let currChar = guess[i];
      let currCount: number = count.get(currChar);
      if (currChar === answerArr[i]) {
        statuses[i] = theme.palette.success;
        count.set(currChar, currCount - 1);
      }
    }
    // Set all containing but in the wrong position chars
    for (let i = 0; i < Math.min(guess.length, answer.length); i++) {
      let currChar = guess[i];
      let currCount: number = count.get(currChar);
      if (currCount && currCount > 0 && statuses[i] === theme.palette.error) {
        statuses[i] = theme.palette.warning;
        count.set(currChar, currCount - 1);
      }
    }

    // Set all chars outside the designated answer length.
    // Eg.answer is Bach but guess is busch, indicate that the last h is
    // out of bounds with a separate color.
    for (let i = Math.min(guess.length, answer.length); i < guess.length; i++) {
      statuses[i] = theme.palette.secondary;
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
                  <GameRow guess={currGuess} key={gi} /> // Current guess
                ) : (
                  <GameRow
                    guess={g}
                    key={gi}
                    statuses={getStatuses(g)}
                    isPastGuess={gi < guessNumber[i]}
                  /> // Past guesses
                )
              )
            : null // Don't render rows for the non-active question
      )}
    </Stack>
  );
};

export default GameGrid;
