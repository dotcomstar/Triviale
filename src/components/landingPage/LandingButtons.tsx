import { Snackbar, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ALERT_TIME_MS, MOBILE_SCREEN_CUTOFF } from "../../constants/settings";
import { HARD_MODE_ALERT_MESSAGE } from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import useGameStateStore from "../../stores/gameStateStore";
import useHardModeStore from "../../stores/hardModeStore";
import HardModeLandingButton from "./HardModeLandingButton";
import HowToPlayLandingButton from "./HowToPlayLandingButton";
import PlayLandingButton from "./PlayLandingButton";
import ShareLandingButton from "./ShareLandingButton";

interface LandingButtonsProps {
  onClose: () => void;
}

const LandingButtons = ({ onClose }: LandingButtonsProps) => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const { guesses, gameState } = useGameStateStore();
  const setHelpOpen = useDialogStore((s) => s.setHelpOpen);
  const setStatsOpen = useDialogStore((s) => s.setStatsOpen);
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
        width={matches ? "40dvw" : "100dvw"}
        spacing={matches ? "5%" : "3%"}
      >
        {canToggleHardMode && gameState === "inProgress" && (
          <HowToPlayLandingButton setHelpOpen={setHelpOpen} />
        )}
        {gameState === "inProgress" && (
          <PlayLandingButton
            onClose={onClose}
            hasNotStartedPlaying={canToggleHardMode}
          />
        )}
        {canToggleHardMode && gameState === "inProgress" && (
          <HardModeLandingButton setHardMode={setHardMode} onClose={onClose} />
        )}
        {gameState !== "inProgress" && (
          <ShareLandingButton onClose={onClose} setStatsOpen={setStatsOpen} />
        )}
      </Stack>
    </>
  );
};

export default LandingButtons;
