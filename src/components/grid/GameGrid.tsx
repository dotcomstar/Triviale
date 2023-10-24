// import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import { Stack } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";
import useCurrGuessStore from "../../stores/currGuessStore";

const GameGrid = () => {
  //   const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const numEmptyRows = MAX_CHALLENGES - guessNumber - 1;
  const guess = useCurrGuessStore((s) => s.guess);
  return (
    <Stack direction={"column"} spacing={1}>
      <CurrentRow guess={guess} />
      {[...Array(numEmptyRows)].map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </Stack>
  );
};

export default GameGrid;
