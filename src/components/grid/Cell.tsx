import { keyframes } from "@emotion/react";
import {
  Box,
  PaletteColor,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  ABSENT_TEXT,
  CORRECT_TEXT,
  PRESENT_TEXT,
  SKIPPED_TEXT,
  SKIP_LETTER,
} from "../../constants/strings";
import {
  FLIP_ANIMATION_MS,
  MOBILE_SCREEN_CUTOFF,
  PULSE_TYPE_MS,
  REVEAL_TIME_MS,
  WAVE_BOUNCE_MS,
} from "../../constants/settings";

const popKeyframes = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.12); }
  100% { transform: scale(1); }
`;

const flipKeyframes = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
`;

const bounceKeyframes = keyframes`
  0% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

interface CellProps {
  nthLetter: number;
  value?: string;
  status?: PaletteColor;
  fontSizeOverride?: string;
  isH3?: boolean;
  fontColor?: string;
  alternateLean?: boolean;
  borderColorOverride?: string;
  winBounceDelayMs?: number;
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
  winBounceDelayMs,
}: CellProps) => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  // Whole-tile "pop" on a freshly typed letter. Retriggers every time this
  // slot goes empty -> filled again (type, delete, retype), which a static
  // animation value can't do on its own, so isPopping is explicitly flipped
  // off and back on to force the browser to restart it.
  const prevHadValueRef = useRef(!!value);
  const [isPopping, setIsPopping] = useState(false);
  useEffect(() => {
    const wasEmpty = !prevHadValueRef.current;
    prevHadValueRef.current = !!value;
    if (!value || !wasEmpty || prefersReducedMotion) {
      return;
    }
    setIsPopping(false);
    const restart = setTimeout(() => setIsPopping(true), 0);
    return () => clearTimeout(restart);
  }, [value, prefersReducedMotion]);
  useEffect(() => {
    if (!isPopping) {
      return;
    }
    const stop = setTimeout(() => setIsPopping(false), PULSE_TYPE_MS);
    return () => clearTimeout(stop);
  }, [isPopping]);

  // Flip-and-reveal on a real submission. Only fires the first time `status`
  // goes from undefined to defined for this Cell instance (a live guess
  // being scored) -- never on mount, so a page load or question-tab switch
  // that mounts an already-scored past guess shows its color immediately
  // instead of replaying the flip.
  const prevHadStatusRef = useRef(!!status);
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(status);
  useEffect(() => {
    const wasUnrevealed = !prevHadStatusRef.current;
    prevHadStatusRef.current = !!status;
    if (!status || !wasUnrevealed) {
      return;
    }
    if (prefersReducedMotion) {
      setDisplayStatus(status);
      return;
    }
    setIsFlipping(true);
    const midpoint =
      REVEAL_TIME_MS * (nthLetter - 1) + FLIP_ANIMATION_MS / 2;
    const reveal = setTimeout(() => setDisplayStatus(status), midpoint);
    return () => clearTimeout(reveal);
  }, [status, prefersReducedMotion, nthLetter]);

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

  const animation = isPopping
    ? `${popKeyframes} ${PULSE_TYPE_MS}ms ease-out`
    : winBounceDelayMs !== undefined && !prefersReducedMotion
    ? `${bounceKeyframes} ${WAVE_BOUNCE_MS}ms ease-out ${winBounceDelayMs}ms`
    : isFlipping
    ? `${flipKeyframes} ${FLIP_ANIMATION_MS}ms ease-in-out ${
        REVEAL_TIME_MS * (nthLetter - 1)
      }ms`
    : "none";

  return (
    <Box
      className={value ? "Triviale-filled" : ""}
      aria-label={description}
      aria-live={value ? "polite" : "off"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: displayStatus && !borderColorOverride ? "none" : "2px solid",
        borderColor:
          borderColorOverride ||
          `${value ? "primary.light" : "primary.darker"}`,
        borderRadius: 10,
        height: isNotMobile ? "52px" : "48px",
        width: "52px",
        backgroundColor: displayStatus?.main || "info.dark",
        overflow: "clip",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: alternateLean ? undefined : "100px",
        borderBottomLeftRadius: alternateLean ? "100px" : undefined,
        borderBottomRightRadius: "100px",
        animation,
      }}
    >
      <Zoom in={!!value} easing={"cubic-bezier(.05, 2, 1, 1)"}>
        <Typography
          fontSize={fontSizeOverride ? fontSizeOverride : "1.5em"}
          color={fontColor ? fontColor : displayStatus?.contrastText}
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
