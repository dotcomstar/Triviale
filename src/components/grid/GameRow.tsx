import { Box, PaletteColor, Stack } from "@mui/material";
import useQuestionByID from "../../hooks/useQuestionByID";
import useGameStateStore from "../../stores/gameStateStore";
import Cell from "./Cell";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";

interface GameRowProps {
  guess: string[];
  statuses?: PaletteColor[];
}

const GameRow = ({ guess, statuses = [] }: GameRowProps) => {
  const dailyIndex = useDailyIndex();
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const question = useQuestionByID(safeIndex);
  const answer = question?.answer.toLocaleUpperCase()!;
  const emptyCells = Array.from(Array(answer.length - guess.length));

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      // spacing="5px"
    >
      {guess.map((letter, i) => (
        <>
          {i !== 0 && (
            <Box
              key={`before ${i}`}
              sx={{
                width: "2.5px",
                borderBottom: 2,
                borderColor: statuses[i] ? statuses[i].main : "primary.light",
              }}
            />
          )}
          <Cell key={i} nthLetter={i + 1} value={letter} status={statuses[i]} />
          {i < answer.length - 1 && (
            <Box
              key={`after ${i}`}
              sx={{
                width: "2.5px",
                borderBottom: 2,
                borderColor: statuses[i] ? statuses[i].main : "primary.light",
              }}
            />
          )}
        </>
      ))}
      {emptyCells.map((_, i) => (
        <>
          {i + guess.length !== 0 && (
            <Box
              key={`before ${i}`}
              sx={{
                width: "2.5px",
                borderBottom: 2,
                borderColor: "primary.dark",
              }}
            />
          )}
          <Cell key={i} nthLetter={guess.length + i + 1} />
          {i < answer.length - guess.length - 1 && (
            <Box
              key={`after ${i}`}
              sx={{
                width: "2.5px",
                borderBottom: 2,
                borderColor: "primary.dark",
              }}
            />
          )}
        </>
      ))}
    </Stack>
  );
};

export default GameRow;
