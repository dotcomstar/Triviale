import { Button, Stack, Typography } from "@mui/material";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";
import { MAX_CHALLENGES } from "../../constants/settings";
import { SKIP_BUTTON_TEXT } from "../../constants/strings";

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
          {SKIP_BUTTON_TEXT}
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
