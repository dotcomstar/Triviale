import { PaletteColor, Stack } from "@mui/material";
import useQuestionByID from "../../hooks/useQuestionByID";
import useGameStateStore from "../../stores/gameStateStore";
import Cell from "./Cell";

interface GameRowProps {
  guess: string[];
  statuses?: PaletteColor[];
}

const GameRow = ({ guess, statuses = [] }: GameRowProps) => {
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const question = useQuestionByID(questionNumber);
  const answer = question?.answer.toLocaleUpperCase()!;
  const emptyCells = Array.from(Array(answer.length - guess.length));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing="5px"
    >
      {guess.map((letter, i) => (
        <Cell key={i} nthLetter={i + 1} value={letter} status={statuses[i]} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} nthLetter={guess.length + i + 1} />
      ))}
    </Stack>
  );
};

export default GameRow;
