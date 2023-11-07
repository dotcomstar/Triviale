import { Box, PaletteColor, Typography, useMediaQuery } from "@mui/material";
import { SKIPPED_TEXT, SKIP_LETTER } from "../../constants/strings";

interface CellProps {
  nthLetter: number;
  value?: string;
  status?: PaletteColor;
}

const Cell = ({ nthLetter, value, status = undefined }: CellProps) => {
  const matches = useMediaQuery("(min-width:600px)");
  const description = `${nthLetter}${
    nthLetter !== 11 && nthLetter % 10 === 1
      ? "st"
      : nthLetter !== 12 && nthLetter % 10 === 2
      ? "nd"
      : nthLetter !== 13 && nthLetter % 10 === 3
      ? "rd"
      : "th"
  } letter, ${
    value ? (value === SKIP_LETTER ? SKIPPED_TEXT : value) : "empty"
  }`;

  return (
    <Box
      aria-label={description}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: status ? "none" : "2px solid",
        borderColor: `${value ? "primary.light" : "primary.dark"}`,
        borderRadius: 10,
        height: matches ? "52px" : "48px",
        width: "52px",
        backgroundColor: status?.main,
        overflow: "clip",
      }}
    >
      <Typography
        fontSize={"1.5em"}
        color={status?.contrastText}
        fontWeight={"bold"}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default Cell;
