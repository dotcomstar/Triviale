import { Box, Typography } from "@mui/material";

interface CellProps {
  nthLetter: number;
  value?: string;
}

const Cell = ({ nthLetter, value }: CellProps) => {
  const description = `${nthLetter}${
    nthLetter !== 11 && nthLetter % 10 === 1
      ? "st"
      : nthLetter !== 12 && nthLetter % 10 === 2
      ? "nd"
      : nthLetter !== 13 && nthLetter % 10 === 3
      ? "rd"
      : "th"
  } letter, ${value ? value : "empty"}`;
  return (
    <Box
      aria-label={description}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: `2px solid gray`,
        height: "52px",
        width: "52px",
      }}
    >
      <Typography fontSize={"1.5em"} fontWeight={"bold"}>
        {value}
      </Typography>
    </Box>
  );
};

export default Cell;
