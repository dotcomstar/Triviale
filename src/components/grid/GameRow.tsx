import { Box, PaletteColor, Stack, useTheme } from "@mui/material";
import useQuestionByID from "../../hooks/useQuestionByID";
import useGameStateStore from "../../stores/gameStateStore";
import Cell from "./Cell";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useRetrievedStore from "../../stores/retrievedStore";
import useHardModeStore from "../../stores/hardModeStore";

interface GameRowProps {
  guess: string[];
  statuses?: PaletteColor[];
  answerOverride?: string;
  isPastGuess?: boolean;
}

const GameRow = ({
  guess,
  statuses = [],
  answerOverride,
  isPastGuess,
}: GameRowProps) => {
  const hardMode = useHardModeStore((s) => s.hardMode);
  const dailyIndex = useDailyIndex();
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const safeIndex = getPositiveIndex(
    questionNumber + (retrieved ? 0 : dailyIndex)
  );
  const questionState = useGameStateStore(
    (s) => s.questionState[questionNumber]
  );
  const isInProgress = questionState === "inProgress";
  const inProgressHardMode = isInProgress && hardMode && !answerOverride;
  const question = useQuestionByID(safeIndex);
  let ans = question?.answer;
  if (answerOverride) {
    ans = answerOverride;
  }
  const answerWithSpaces = ans?.toLocaleUpperCase()!;
  const answer = answerWithSpaces.replace(/\s+/g, "")!;
  const emptyCellsLength =
    hardMode && !answerOverride
      ? isPastGuess
        ? 0
        : 1
      : answer.length - guess.length;
  const emptyCells = Array.from(Array(emptyCellsLength));
  const theme = useTheme();
  let offsetFromPrevSkipped = 1;

  return (
    <Stack
      direction="row"
      justifyContent={answerOverride ? "left" : "center"}
      alignItems="center"
    >
      {guess.map((letter, i) => {
        let shouldSkip = false;
        if (answerWithSpaces[i + offsetFromPrevSkipped] === " ") {
          shouldSkip = true;
          offsetFromPrevSkipped += 1;
        }
        return (
          <>
            <Cell
              key={i}
              nthLetter={i + 1}
              value={letter}
              status={statuses[i]}
            />
            {(inProgressHardMode ||
              i < Math.max(guess.length - 1, answer.length - 1)) && ( // Prevents hanging box after the last letter
              <Box
                key={`after ${i}`}
                sx={{
                  width: shouldSkip && inProgressHardMode ? "10px" : "5px",
                  borderBottom:
                    shouldSkip ||
                    inProgressHardMode ||
                    (hardMode && answer.length !== guess.length) // Don't render boxes for an incorrect length guess
                      ? 0
                      : 2,
                  borderColor:
                    statuses[i] === theme.palette.success &&
                    statuses[i + 1] === theme.palette.success
                      ? statuses[i].main
                      : !answerOverride &&
                        (statuses[i] === theme.palette.error ||
                          statuses[i + 1] === theme.palette.error ||
                          statuses[i] === theme.palette.warning ||
                          statuses[i + 1] === theme.palette.warning)
                      ? "primary.dark"
                      : "primary.light",
                }}
              />
            )}
          </>
        );
      })}
      {emptyCells.map((_, i) => {
        let shouldSkipEmpty = false;
        if (
          answerWithSpaces[i + guess.length + offsetFromPrevSkipped] === " "
        ) {
          shouldSkipEmpty = true;
          offsetFromPrevSkipped += 1;
        }
        return (
          <>
            <Cell key={i + guess.length} nthLetter={guess.length + i + 1} />
            {i < answer.length - guess.length - 1 && (
              <Box
                key={`after ${i + guess.length}`}
                sx={{
                  width: shouldSkipEmpty && inProgressHardMode ? "10px" : "5px",
                  borderBottom:
                    shouldSkipEmpty ||
                    inProgressHardMode ||
                    (hardMode && answer.length !== guess.length)
                      ? 0
                      : 2,
                  borderColor: "primary.dark",
                }}
              />
            )}
          </>
        );
      })}
    </Stack>
  );
};

export default GameRow;
