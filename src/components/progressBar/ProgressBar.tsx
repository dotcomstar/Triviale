import { Button, Stack, useMediaQuery } from "@mui/material";
import { QUESTIONS_PER_DAY } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";

const ProgressBar = () => {
  const resetGuess = useCurrGuessStore((s) => s.resetGuess);
  const { moveToQuestion, questionState } = useGameStateStore();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack
      direction="row"
      px={matches ? "10px" : "0px"}
      py={"5px"}
      pt={matches ? "5px" : "0px"}
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
            onClick={() => {
              resetGuess();
              moveToQuestion(i);
            }}
            disableElevation
            color={
              questionState[i] === "inProgress"
                ? undefined
                : questionState[i] === "won"
                ? "success"
                : "error"
            }
            sx={{ borderRadius: 0 }}
          >
            {`Q${i + 1}`}
          </Button>
        ))}
    </Stack>
  );
};

export default ProgressBar;
