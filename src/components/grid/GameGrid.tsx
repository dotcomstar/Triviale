// import useQuestionExpansionStore from "../../stores/questionExpansionStore";
import { MAX_CHALLENGES } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import EmptyRow from "./EmptyRow";

const GameGrid = () => {
  //   const { questionExpansion, expandQuestion } = useQuestionExpansionStore();
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  return (
    <>
      {MAX_CHALLENGES}
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
      <EmptyRow />
    </>
  );
};

export default GameGrid;
