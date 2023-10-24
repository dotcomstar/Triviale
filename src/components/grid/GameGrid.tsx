// import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import { Stack } from "@mui/material";
import useCurrGuessStore from "../../stores/currGuessStore";
import useGameStateStore from "../../stores/gameStateStore";
import GameRow from "./GameRow";

const GameGrid = () => {
  //   const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const currGuess = useCurrGuessStore((s) => s.guess);
  const guesses = useGameStateStore((s) => s.guesses);

  return (
    <Stack direction={"column"} spacing={1}>
      <GameRow guess={currGuess} />
      {guesses.map((q, i) =>
        i === questionNumber ? (
          q.map((g, gi) =>
            gi === guessNumber ? (
              <GameRow guess={currGuess} />
            ) : (
              <GameRow guess={g} />
            )
          )
        ) : (
          <GameRow guess={["T", "E", "S", "T"]} />
        )
      )}
    </Stack>
  );
};

export default GameGrid;
