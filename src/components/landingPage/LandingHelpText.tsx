import { Stack, Typography } from "@mui/material";
import useGameStateStore from "../../stores/gameStateStore";
import {
  RESUME_ENCOURAGEMENT_TEXT,
  START_ENCOURAGEMENT_TEXT,
} from "../../constants/strings";

const LandingHelpText = () => {
  const guesses = useGameStateStore((s) => s.guesses);
  const hasntPlayed = guesses.reduce(
    (acc, question) =>
      acc && question.reduce((qAcc, guess) => qAcc && guess.length === 0, true),
    true
  );

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography
        translate="no"
        variant="h5"
        sx={{ fontSize: "8vw" }}
        letterSpacing={"-1px"}
        align="center"
        justifyContent={"center"}
        display={"flex"}
        color={"#3A3A3C"}
        whiteSpace={"break-spaces"}
      >
        {hasntPlayed ? START_ENCOURAGEMENT_TEXT : RESUME_ENCOURAGEMENT_TEXT}
      </Typography>
    </Stack>
  );
};

export default LandingHelpText;
