import { Stack, useTheme } from "@mui/material";
import Cell from "./Cell";
import useQuestionByID from "../../hooks/useQuestionByID";
import useGameStateStore from "../../stores/gameStateStore";

interface GameRowProps {
  guess: string[];
}

const GameRow = ({ guess }: GameRowProps) => {
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const question = useQuestionByID(questionNumber);
  const solution = question?.answer!;
  const emptyCells = Array.from(Array(solution.length - guess.length));
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing="5px"
    >
      {guess.map((letter, i) => (
        <Cell
          key={i}
          nthLetter={i + 1}
          value={letter}
          status={theme.palette.success}
        />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} nthLetter={guess.length + i + 1} />
      ))}
    </Stack>
  );
};

export default GameRow;
