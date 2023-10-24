import { Button, Stack, Typography } from "@mui/material";
import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const length = children.length / 5; // TODO: Split questions more intelligently.
  const summary =
    questionExpansion < 5
      ? children.substring(0, questionExpansion * length) + "..."
      : children;
  const makeGuess = useGameStateStore((s) => s.makeGuess);
  const { guess, resetGuess } = useCurrGuessStore();

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {questionExpansion < 5 && (
        <Button
          onClick={() => {
            expandQuestion();
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
