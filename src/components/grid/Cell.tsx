import { keyframes } from "@emotion/react";
import {
  Box,
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

// The scoring outcome of a letter, named by the theme palette entry that
// colors it. Deliberately a key rather than the PaletteColor object itself:
// ThemedLayout rebuilds the theme in place on a dark-mode or colorblind
// toggle, so every palette object is replaced without any Cell remounting.
// Resolving the key against the current theme at render time keeps an
// already-scored tile in the right color; caching the object would freeze
// it in the previous mode's color. "primary" is the neutral tile the help
// dialog's sample rows use for letters that aren't being explained.
export type LetterStatus = "success" | "warning" | "error" | "primary";

interface CellProps {
  nthLetter: number;
  value?: string;
  status?: LetterStatus;
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
  const [isWaving, setIsWaving] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(status);
  useEffect(() => {
    const wasUnrevealed = !prevHadStatusRef.current;
    prevHadStatusRef.current = !!status;

    // This setting can change while a flip is waiting to reveal its color.
    // Honor it immediately instead of requiring the Cell to receive a new
    // status prop before it can leave the in-progress animation state.
    if (prefersReducedMotion) {
      if (status) {
        setDisplayStatus(status);
      }
      setIsFlipping(false);
      setIsWaving(false);
      return;
    }
    if (!status || !wasUnrevealed) {
      // Already revealed (or cleared): mirror the prop directly. This also
      // covers a dependency change while a reveal timer is still pending --
      // the cleanup below has just cancelled that timer, so without this the
      // tile would never receive its color.
      setDisplayStatus(status);
      return;
    }
    setIsFlipping(true);
    // A wave is meaningful only for the live transition from an unscored
    // Cell. Persisted/revisited winning rows mount with a status already set
    // and therefore remain still.
    setIsWaving(winBounceDelayMs !== undefined);
    const midpoint =
      REVEAL_TIME_MS * (nthLetter - 1) + FLIP_ANIMATION_MS / 2;
    const reveal = setTimeout(() => setDisplayStatus(status), midpoint);
    return () => clearTimeout(reveal);
  }, [status, prefersReducedMotion, nthLetter, winBounceDelayMs]);

  const getStatusText = (): string => {
    let statusText = "";
    if (!status) {
      return "";
    }
    statusText += ", ";
    if (status === "success") {
      statusText += CORRECT_TEXT;
    } else if (status === "warning") {
      statusText += PRESENT_TEXT;
    } else if (status === "error") {
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

  // Resolved on every render, not cached, so the tile follows theme changes.
  const displayColor = displayStatus
    ? theme.palette[displayStatus]
    : undefined;

  const animation = isPopping
    ? `${popKeyframes} ${PULSE_TYPE_MS}ms ease-out`
    : [
        isFlipping &&
          `${flipKeyframes} ${FLIP_ANIMATION_MS}ms ease-in-out ${
            REVEAL_TIME_MS * (nthLetter - 1)
          }ms`,
        isWaving &&
          !prefersReducedMotion &&
          `${bounceKeyframes} ${WAVE_BOUNCE_MS}ms ease-out ${winBounceDelayMs}ms`,
      ]
        .filter(Boolean)
        .join(", ") || "none";

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
        backgroundColor: displayColor?.main || "info.dark",
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
          color={fontColor ? fontColor : displayColor?.contrastText}
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
