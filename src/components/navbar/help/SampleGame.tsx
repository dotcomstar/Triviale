import { Stack, Typography, useTheme } from "@mui/material";
import {
  EXAMPLES_TEXT,
  HELP_CORRECT_LETTER_AND_SPOT,
  HELP_CORRECT_LETTER_WRONG_SPOT,
  HELP_WRONG_LETTER,
} from "../../../constants/strings";
import GameRow from "../../grid/GameRow";

// TODO: Bold the referenced letters.
const SampleGame = () => {
  const theme = useTheme();
  return (
    <Stack direction={"column"} sx={{ m: 3, mt: 0 }}>
      <Typography sx={{ mb: 1 }} fontWeight={"bold"}>
        {EXAMPLES_TEXT}
      </Typography>
      <GameRow
        guess={["B", "U", "R", "R"]}
        statuses={[
          theme.palette.success,
          theme.palette.primary,
          theme.palette.primary,
          theme.palette.primary,
        ]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_CORRECT_LETTER_AND_SPOT}</Typography>
      <GameRow
        guess={["C", "R", "A", "B"]}
        statuses={[
          theme.palette.primary,
          theme.palette.warning,
          theme.palette.primary,
          theme.palette.primary,
        ]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_CORRECT_LETTER_WRONG_SPOT}</Typography>
      <GameRow
        guess={["E", "N", "T", "S"]}
        statuses={[
          theme.palette.primary,
          theme.palette.primary,
          theme.palette.error,
          theme.palette.primary,
        ]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_WRONG_LETTER}</Typography>
    </Stack>
  );
};

export default SampleGame;
