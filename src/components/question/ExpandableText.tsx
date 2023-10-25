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
  const { gameState, resetQuestion, moveToNextQuestion } = useGameStateStore();
  const randomIndex = Math.floor(Math.random() * WIN_MESSAGES.length);

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {guessNumber < MAX_CHALLENGES && (
        <Button
          onClick={() => {
            if (questionState !== "inProgress" && gameState === "inProgress") {
              resetQuestion();
              moveToNextQuestion();
            }
            if (questionState === "inProgress") {
              makeGuess([]);
            }
            resetGuess();
          }}
          color="secondary"
          variant={questionState === "inProgress" ? "text" : "contained"}
          sx={{ mb: 1 }}
        >
          {questionState === "inProgress"
            ? SKIP_BUTTON_TEXT
            : WIN_MESSAGES[randomIndex] + " " + NEXT_QUESTIONS_TEXT}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
