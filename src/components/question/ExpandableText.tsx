import { Button, Stack, Typography } from "@mui/material";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const guessNumber = useGameStateStore((s) => s.guessNumber) + 1;
  const length = children.length / 5; // TODO: Split questions more intelligently.
  const summary =
    guessNumber < 5
      ? children.substring(0, guessNumber * length) + "..."
      : children;
  const makeGuess = useGameStateStore((s) => s.makeGuess);
  const { guess, resetGuess } = useCurrGuessStore();

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {guessNumber < 5 && (
        <Button
          onClick={() => {
            makeGuess(guess);
            resetGuess();
          }}
          color="secondary"
        >
          Show more
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
