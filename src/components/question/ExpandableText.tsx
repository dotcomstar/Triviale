import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import {
  NEXT_QUESTIONS_TEXT,
  NUMBER_CORRECT_TEXT,
  SKIP_BUTTON_TEXT,
  SKIP_LETTER,
  WIN_MESSAGES,
} from "../../constants/strings";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import useQuestionByID from "../../hooks/useQuestionByID";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const guessNumber = useGameStateStore((s) => s.guessNumber) + 1;
  const length = children.length / MAX_CHALLENGES; // TODO: Split questions more intelligently.
  const makeGuess = useGameStateStore((s) => s.makeGuess);
  const resetGuess = useCurrGuessStore((s) => s.resetGuess);
  const questionState = useGameStateStore((s) => s.questionState);
  const { gameState, moveToNextQuestion, questionNumber } = useGameStateStore();
  const summary =
    guessNumber < MAX_CHALLENGES &&
    questionState[questionNumber] === "inProgress"
      ? children.substring(0, guessNumber * length) + "..."
      : children;
  const randomIndex = Math.floor(Math.random() * WIN_MESSAGES.length);
  const dailyIndex = useDailyIndex();
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const answer = useQuestionByID(safeIndex)?.answer!;
  const numWon = questionState.reduce(
    (acc, guess) => acc + (guess === "won" ? 1 : 0),
    0
  );

  return (
    <Stack>
      <Paper elevation={2}>
        <Typography fontSize="large" m={1}>
          {summary}
        </Typography>
      </Paper>
      {(guessNumber < MAX_CHALLENGES ||
        questionState[questionNumber] !== "inProgress") && (
        <Button
          id="ExpandableButton"
          disableFocusRipple
          onClick={() => {
            if (
              questionState[questionNumber] !== "inProgress" &&
              gameState === "inProgress"
            ) {
              resetGuess();
              moveToNextQuestion();
            }
            if (questionState[questionNumber] === "inProgress") {
              makeGuess(Array(answer.length).fill(SKIP_LETTER));
              resetGuess();
            }
          }}
          color="secondary"
          variant={
            questionState[questionNumber] === "inProgress"
              ? "text"
              : "contained"
          }
          sx={{ mb: 1 }}
        >
          {gameState === "inProgress"
            ? questionState[questionNumber] === "inProgress"
              ? SKIP_BUTTON_TEXT
              : questionState[questionNumber] === "won"
              ? WIN_MESSAGES[randomIndex] + " " + NEXT_QUESTIONS_TEXT
              : NEXT_QUESTIONS_TEXT
            : gameState === "lost"
            ? NUMBER_CORRECT_TEXT(numWon)
            : WIN_MESSAGES[randomIndex] + " " + NUMBER_CORRECT_TEXT(numWon)}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
