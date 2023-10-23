// import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import { Stack } from "@mui/material";
import { MAX_CHALLENGES } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import EmptyRow from "./EmptyRow";

const GameGrid = () => {
  //   const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const numEmptyRows = MAX_CHALLENGES - guessNumber;
  return (
    <Stack direction={"column"} spacing={1}>
      {[...Array(numEmptyRows)].map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </Stack>
  );
};

export default GameGrid;
