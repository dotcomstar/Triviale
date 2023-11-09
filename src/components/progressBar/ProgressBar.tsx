import { Button, Stack } from "@mui/material";
import { QUESTIONS_PER_DAY } from "../../constants/settings";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";

const ProgressBar = () => {
  const resetGuess = useCurrGuessStore((s) => s.resetGuess);
  const { moveToQuestion, questionState, guesses } = useGameStateStore();

  return (
    <Stack
      direction="row"
      p={"0px"}
      pb={"5px"}
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
                ? guesses[i].reduce(
                    (acc, guess) => acc + (guess.length > 0 ? 1 : 0),
                    0
                  ) > 0
                  ? "warning"
                  : undefined
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
