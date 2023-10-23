// import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import { Stack } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import EmptyRow from "./EmptyRow";
import CurrentRow from "./CurrentRow";

const GameGrid = () => {
  //   const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const numEmptyRows = MAX_CHALLENGES - guessNumber - 1;
  return (
    <Stack direction={"column"} spacing={1}>
      <CurrentRow />
      {[...Array(numEmptyRows)].map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </Stack>
  );
};

export default GameGrid;
