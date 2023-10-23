// import { solution } from "../../lib/words";
import { Stack } from "@mui/material";
import Cell from "./Cell";
import useQuestionByID from "../../hooks/useQuestionByID";

const CurrentRow = () => {
  const question = useQuestionByID(3);
  const solution = question?.answer!;
  const emptyCells = Array.from(Array(solution.length));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ m: "8px" }}
      spacing="5px"
    >
      {emptyCells.map((_, i) => (
        <Cell key={i} nthLetter={i + 1} value="" />
      ))}
    </Stack>
  );
};

export default CurrentRow;
