import { Button, Stack, Typography } from "@mui/material";
import useQuestionExpansionStore from "../../stores/questionExpansionStore";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const length = children.length / 5;
  const summary =
    questionExpansion < 5
      ? children.substring(0, questionExpansion * length) + "..."
      : children;

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {questionExpansion < 5 && (
        <Button onClick={() => expandQuestion()} color="secondary">
          Show more
        </Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
