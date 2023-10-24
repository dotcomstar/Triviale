import { Stack } from "@mui/material";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import GameRow from "./GameRow";

const GameGrid = () => {
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const currGuess = useCurrGuessStore((s) => s.guess);
  const guesses = useGameStateStore((s) => s.guesses);

  return (
    <Stack direction={"column"} spacing={1}>
      {guesses.map((q, i) =>
        i === questionNumber
          ? q.map((g, gi) =>
              gi === guessNumber ? (
                <GameRow guess={currGuess} key={gi} />
              ) : (
                <GameRow guess={g} key={gi} />
              )
            )
          : null
      )}
    </Stack>
  );
};

export default GameGrid;
