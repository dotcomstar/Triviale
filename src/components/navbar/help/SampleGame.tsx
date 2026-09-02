import { Stack, Typography } from "@mui/material";
import {
  EXAMPLES_TEXT,
  HELP_CORRECT_LETTER_AND_SPOT,
  HELP_CORRECT_LETTER_WRONG_SPOT,
  HELP_WRONG_LETTER,
} from "../../../constants/strings";
import GameRow from "../../grid/GameRow";

// TODO: Bold the referenced letters.
const SampleGame = () => {
  return (
    <Stack direction={"column"} sx={{ m: 3, mt: 0 }}>
      <Typography sx={{ mb: 1 }} fontWeight={"bold"}>
        {EXAMPLES_TEXT}
      </Typography>
      <GameRow
        guess={["B", "U", "R", "R"]}
        statuses={["success", "primary", "primary", "primary"]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_CORRECT_LETTER_AND_SPOT}</Typography>
      <GameRow
        guess={["C", "R", "A", "B"]}
        statuses={["primary", "warning", "primary", "primary"]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_CORRECT_LETTER_WRONG_SPOT}</Typography>
      <GameRow
        guess={["E", "N", "T", "S"]}
        statuses={["primary", "primary", "error", "primary"]}
        answerOverride="BRAD"
      />
      <Typography sx={{ mb: 2 }}>{HELP_WRONG_LETTER}</Typography>
    </Stack>
  );
};

export default SampleGame;
