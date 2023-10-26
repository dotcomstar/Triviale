import { Button, Stack } from "@mui/material";
import { QUESTIONS_PER_DAY } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";

const ProgressBar = () => {
  const { moveToQuestion, questionState } = useGameStateStore();

  return (
    <Stack
      direction="row"
      padding="2px"
      justifyContent="center"
      alignItems="center"
    >
      {Array(QUESTIONS_PER_DAY)
        .fill("")
        .map((_, i) => (
          <Button
            key={i}
            fullWidth
            variant="contained"
            onClick={() => moveToQuestion(i)}
            disableElevation
            color={
              questionState[i] === "inProgress"
                ? undefined
                : questionState[i] === "won"
                ? "success"
                : "error"
            }
          >
            {`Q${i + 1}`}
          </Button>
        ))}
    </Stack>
  );
};

export default ProgressBar;
