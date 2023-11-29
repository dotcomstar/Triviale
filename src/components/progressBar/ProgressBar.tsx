import { Box, Button, Stack } from "@mui/material";
import { QUESTIONS_PER_DAY } from "../../constants/settings";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useQuestions from "../../hooks/useQuestions";

const ProgressBar = () => {
  const importGuess = useCurrGuessStore((s) => s.importGuess);
  const { moveToQuestion, questionState, guesses, guessNumber } =
    useGameStateStore();
  const dailyIndex = useDailyIndex();
  const { data } = useQuestions();

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
        .map((_, i, arr) => (
          <>
            <Button
              key={i}
              variant="contained"
              onClick={() => {
                moveToQuestion(i);
                importGuess(guesses[i][guessNumber[i]]);
              }}
              disableElevation
              color={
                questionState[i] === "inProgress"
                  ? // Check if game has been started yet
                    guesses[i].reduce(
                      (acc, guess) => acc + (guess.length > 0 ? 1 : 0),
                      0
                    ) > 0
                    ? "warning"
                    : undefined
                  : questionState[i] === "won"
                  ? "success"
                  : "error"
              }
              sx={{ borderRadius: 30, width: "calc(100% / 3)" }}
            >
              {`Q${i + 1}, ${data[getPositiveIndex(dailyIndex + i)].category}`}
            </Button>
            {i < arr.length - 1 && (
              <Box
                sx={{
                  width: "calc(5%)",
                  borderBottom: 2,
                  borderColor: "primary.dark",
                }}
              />
            )}
          </>
        ))}
    </Stack>
  );
};

export default ProgressBar;
