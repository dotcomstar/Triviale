import { Box, PaletteColor, Typography, useMediaQuery } from "@mui/material";
import { SKIPPED_TEXT, SKIP_LETTER } from "../../constants/strings";

interface CellProps {
  nthLetter: number;
  value?: string;
  status?: PaletteColor;
  fontSizeOverride?: string;
  isH3?: boolean;
  fontColor?: string;
  alternateLean?: boolean;
}

const Cell = ({
  nthLetter,
  value,
  status = undefined,
  fontSizeOverride,
  isH3,
  fontColor,
  alternateLean,
}: CellProps) => {
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
        borderColor: `${value ? "primary.light" : "primary.darker"}`,
        borderRadius: 10,
        height: matches ? "52px" : "48px",
        width: "52px",
        backgroundColor: status?.main,
        overflow: "clip",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: alternateLean ? undefined : "100px",
        borderBottomLeftRadius: alternateLean ? "100px" : undefined,
        borderBottomRightRadius: "100px",
      }}
    >
      <Typography
        fontSize={fontSizeOverride ? fontSizeOverride : "1.5em"}
        color={fontColor ? fontColor : status?.contrastText}
        fontWeight={"bold"}
        variant={isH3 ? "h3" : "body1"}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default Cell;
