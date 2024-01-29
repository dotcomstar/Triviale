import { Snackbar, Stack, useMediaQuery } from "@mui/material";
import {
  HARD_MODE_ALERT_MESSAGE,
  HARD_MODE_LABEL,
  HELP_HOW_TO_PLAY,
  PLAY_CLASSIC_MODE_LABEL,
  RESUME_PLAY_LABEL,
} from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import useGameStateStore from "../../stores/gameStateStore";
import useHardModeStore from "../../stores/hardModeStore";
import LandingButton from "./LandingButton";
import { ALERT_TIME_MS, MOBILE_SCREEN_CUTOFF } from "../../constants/settings";
import { useState } from "react";

interface LandingButtonsProps {
  onClose: () => void;
}

const LandingButtons = ({ onClose }: LandingButtonsProps) => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const guesses = useGameStateStore((s) => s.guesses);
  const setHelpOpen = useDialogStore((s) => s.setHelpOpen);
  const { setHardMode } = useHardModeStore();
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
        justifyContent="center"
        alignItems="center"
        width={matches ? "40vw" : "100vw"}
        spacing={matches ? "5%" : "3%"}
      >
        <LandingButton
          color={canToggleHardMode ? "success" : "warning"}
          onClick={() => {
            onClose();
          }}
        >
          {canToggleHardMode ? PLAY_CLASSIC_MODE_LABEL : RESUME_PLAY_LABEL}
        </LandingButton>
        {canToggleHardMode && (
          <LandingButton
            color="secondary"
            onClick={() => {
              setHelpOpen(true);
            }}
          >
            {HELP_HOW_TO_PLAY}
          </LandingButton>
        )}
        {canToggleHardMode && (
          <LandingButton
            color="success"
            onClick={() => {
              setHardMode(true);
              onClose();
            }}
          >
            {HARD_MODE_LABEL}
          </LandingButton>
        )}
      </Stack>
    </>
  );
};

export default LandingButtons;
