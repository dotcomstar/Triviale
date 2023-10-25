import { Button, Stack, Typography } from "@mui/material";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";
import { MAX_CHALLENGES } from "../../constants/settings";
import { SKIP_BUTTON_TEXT, WIN_MESSAGES } from "../../constants/strings";

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
  const { guess, resetGuess } = useCurrGuessStore();
  const questionState = useGameStateStore((s) => s.questionState);
  const randomIndex = Math.floor(Math.random() * WIN_MESSAGES.length);

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {guessNumber < MAX_CHALLENGES && (
        <Button
          onClick={() => {
            makeGuess(guess);
            resetGuess();
          }}
          color="secondary"
        >
          {questionState === "inProgress"
            ? SKIP_BUTTON_TEXT
            : WIN_MESSAGES[randomIndex]}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
