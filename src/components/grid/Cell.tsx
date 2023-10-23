import { Box } from "@mui/material";

interface CellProps {
  nthLetter: number;
  value: string;
}

const Cell = ({ nthLetter, value = "empty" }: CellProps) => {
  const description = `${nthLetter}${
    nthLetter % 10 === 1
      ? "st"
      : nthLetter % 10 === 2
      ? "nd"
      : nthLetter % 10 === 3
      ? "rd"
      : "th"
  } letter, ${value}`;
  return (
    <Box aria-label={description} sx={{ p: 2, border: "2px solid grey" }}>
      {value}
    </Box>
  );
};

export default Cell;
