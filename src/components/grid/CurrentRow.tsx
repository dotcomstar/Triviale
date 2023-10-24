// import { solution } from "../../lib/words";
import { Stack } from "@mui/material";
import Cell from "./Cell";
import useQuestionByID from "../../hooks/useQuestionByID";

interface CurrentRowProps {
  guess: string[];
}

const CurrentRow = ({ guess }: CurrentRowProps) => {
  const question = useQuestionByID(1);
  const solution = question?.answer!;
  const splitGuess = guess;
  const emptyCells = Array.from(Array(solution.length - splitGuess.length));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ m: "8px" }}
      spacing="5px"
    >
      {splitGuess.map((letter, i) => (
        <Cell key={i} nthLetter={i + 1} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} nthLetter={splitGuess.length + i + 1} />
      ))}
    </Stack>
  );
};

export default CurrentRow;
