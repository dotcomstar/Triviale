import {
  Box,
  PaletteColor,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ABSENT_TEXT,
  CORRECT_TEXT,
  PRESENT_TEXT,
  SKIPPED_TEXT,
  SKIP_LETTER,
} from "../../constants/strings";
import { REVEAL_TIME_MS } from "../../constants/settings";

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
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:600px)");

  const getStatusText = (): string => {
    let statusText = "";
    if (!status) {
      return "";
    }
    statusText += ", ";
    if (status === theme.palette.success) {
      statusText += CORRECT_TEXT;
    } else if (status === theme.palette.warning) {
      statusText += PRESENT_TEXT;
    } else if (status === theme.palette.error) {
      statusText += ABSENT_TEXT;
    }
    return statusText;
  };

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
  }${getStatusText()}`;

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
        backgroundColor: status?.main || "info.dark",
        overflow: "clip",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: alternateLean ? undefined : "100px",
        borderBottomLeftRadius: alternateLean ? "100px" : undefined,
        borderBottomRightRadius: "100px",
        "&:hover": {
          transform: "scale(1.2)",
        },
        transition: () =>
          theme.transitions.create("all", {
            duration: REVEAL_TIME_MS,
          }),
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
