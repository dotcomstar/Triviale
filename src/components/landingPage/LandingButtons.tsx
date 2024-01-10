import { Snackbar, Stack, useMediaQuery } from "@mui/material";
import {
  HARD_MODE_ALERT_MESSAGE,
  HARD_MODE_LABEL,
  HELP_HOW_TO_PLAY,
  PLAY_CLASSIC_MODE_LABEL,
} from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import useGameStateStore from "../../stores/gameStateStore";
import useHardModeStore from "../../stores/hardModeStore";
import LandingButton from "./LandingButton";
import { ALERT_TIME_MS } from "../../constants/settings";
import { useState } from "react";

interface LandingButtonsProps {
  onClose: () => void;
}

const LandingButtons = ({ onClose }: LandingButtonsProps) => {
  const matches = useMediaQuery("(min-width:600px)");
  const guesses = useGameStateStore((s) => s.guesses);
  const setHelpOpen = useDialogStore((s) => s.setHelpOpen);
  const { setHardMode, hardMode } = useHardModeStore();
  const canToggleHardMode = guesses.reduce(
    (acc, question) =>
      acc && question.reduce((qAcc, guess) => qAcc && guess.length === 0, true),
    true
  );
  const [invalidToggle, setInvalidToggle] = useState(false);

  return (
    <>
      <Snackbar
        open={invalidToggle}
        onClose={() => setInvalidToggle(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={ALERT_TIME_MS}
        message={HARD_MODE_ALERT_MESSAGE}
      />
      <Stack
        direction={matches ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
        width={matches ? "40vw" : "100vw"}
        spacing={matches ? "5%" : "3%"}
      >
        <LandingButton
          color="success"
          onClick={() => {
            if (canToggleHardMode || !hardMode) {
              setHardMode(false);
              onClose();
            } else {
              setInvalidToggle(true);
            }
          }}
        >
          {PLAY_CLASSIC_MODE_LABEL}
        </LandingButton>
        <LandingButton
          color="secondary"
          onClick={() => {
            setHelpOpen(true);
          }}
        >
          {HELP_HOW_TO_PLAY}
        </LandingButton>
        <LandingButton
          color="success"
          onClick={() => {
            if (canToggleHardMode || hardMode) {
              setHardMode(true);
              onClose();
            } else {
              setInvalidToggle(true);
            }
          }}
        >
          {HARD_MODE_LABEL}
        </LandingButton>
      </Stack>
    </>
  );
};

export default LandingButtons;
