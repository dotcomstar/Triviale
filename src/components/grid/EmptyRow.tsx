// import { solution } from "../../lib/words";
import { Stack } from "@mui/material";
import Cell from "./Cell";

const EmptyRow = () => {
  const solution = "Burr"; // TODO: Grab from store
  const emptyCells = Array.from(Array(solution.length));

  return (
    <Stack direction="row">
      {emptyCells.map((_, i) => (
        <Cell key={i} nthLetter={i + 1} value="e" />
      ))}
    </Stack>
  );
};

export default EmptyRow;
