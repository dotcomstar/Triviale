import {
  Box,
  PaletteColor,
  Typography,
  Zoom,
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
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";

interface CellProps {
  nthLetter: number;
  value?: string;
  status?: PaletteColor;
  fontSizeOverride?: string;
  isH3?: boolean;
  fontColor?: string;
  alternateLean?: boolean;
  borderColorOverride?: string;
}

const Cell = ({
  nthLetter,
  value,
  status = undefined,
  fontSizeOverride,
  isH3,
  fontColor,
  alternateLean,
  borderColorOverride,
}: CellProps) => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);

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
      className={value ? "Triviale-filled" : ""}
      aria-label={description}
      aria-live={value ? "polite" : "off"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: status && !borderColorOverride ? "none" : "2px solid",
        borderColor:
          borderColorOverride ||
          `${value ? "primary.light" : "primary.darker"}`,
        borderRadius: 10,
        height: isNotMobile ? "52px" : "48px",
        width: "52px",
        backgroundColor: status?.main || "info.dark",
        overflow: "clip",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: alternateLean ? undefined : "100px",
        borderBottomLeftRadius: alternateLean ? "100px" : undefined,
        borderBottomRightRadius: "100px",
        // "&.Triviale-filled": {
        //   transitionTimingFunction: "cubic-bezier(.05, 2, 1, 1)",
        //   transitionDuration: `${REVEAL_TIME_MS}ms`,
        //   transitionProperty: "background-color",
        //   animationDelay: `${REVEAL_TIME_MS * nthLetter}ms`,
        // },
        // transition: () =>
        //   theme.transitions.create("background-color", {
        //     duration: REVEAL_TIME_MS,
        //     delay: REVEAL_TIME_MS * nthLetter,
        //   }),
      }}
    >
      <Zoom in={!!value} easing={"cubic-bezier(.05, 2, 1, 1)"}>
        <Typography
          fontSize={fontSizeOverride ? fontSizeOverride : "1.5em"}
          color={fontColor ? fontColor : status?.contrastText}
          fontWeight={"bold"}
          variant={isH3 ? "h3" : "body1"}
        >
          {value}
        </Typography>
      </Zoom>
    </Box>
  );
};

export default Cell;
