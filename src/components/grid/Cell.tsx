import { Box, Typography } from "@mui/material";

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
    <Box
      aria-label={description}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "2px solid grey",
        height: "52px",
        width: "52px",
      }}
    >
      <Typography fontSize={"2em"} fontWeight={"bold"}>
        {value}
      </Typography>
    </Box>
  );
};

export default Cell;
