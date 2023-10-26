import { Button, Stack, Typography } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import {
  NEXT_QUESTIONS_TEXT,
  SKIP_BUTTON_TEXT,
  WIN_MESSAGES,
} from "../../constants/strings";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const guessNumber = useGameStateStore((s) => s.guessNumber) + 1;
  const length = children.length / MAX_CHALLENGES; // TODO: Split questions more intelligently.
  const summary =
    guessNumber < MAX_CHALLENGES
      ? children.substring(0, guessNumber * length) + "..."
      : children;
  const makeGuess = useGameStateStore((s) => s.makeGuess);
  const resetGuess = useCurrGuessStore((s) => s.resetGuess);
  const questionState = useGameStateStore((s) => s.questionState);
  const { gameState, moveToQuestion, questionNumber } = useGameStateStore();
  const randomIndex = Math.floor(Math.random() * WIN_MESSAGES.length);

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {guessNumber < MAX_CHALLENGES && (
        <Button
          onClick={() => {
            if (
              questionState[questionNumber] !== "inProgress" &&
              gameState === "inProgress"
            ) {
              console.log(gameState.indexOf("inProgress"));
              moveToQuestion(gameState.indexOf("inProgress") + 1); // Move to next unfinished question, if such a question exists.
            }
            if (questionState[questionNumber] === "inProgress") {
              makeGuess([]);
            }
            resetGuess();
          }}
          color="secondary"
          variant={
            questionState[questionNumber] === "inProgress"
              ? "text"
              : "contained"
          }
          sx={{ mb: 1 }}
        >
          {questionState[questionNumber] === "inProgress"
            ? SKIP_BUTTON_TEXT
            : WIN_MESSAGES[randomIndex] +
              (gameState === "inProgress" ? " " + NEXT_QUESTIONS_TEXT : "")}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
