import { useState } from "react";
import {
  HARD_MODE_ALERT_MESSAGE,
  HARD_MODE_DESCRIPTION,
  HARD_MODE_LABEL,
} from "../../../constants/strings";
import useGameStateStore from "../../../stores/gameStateStore";
import useHardModeStore from "../../../stores/hardModeStore";
import SettingsSwitch from "./SettingsSwitch";
import { Snackbar } from "@mui/material";

const HardModeSwitch = () => {
  const { hardMode, toggleHardMode } = useHardModeStore();
  const guesses = useGameStateStore((s) => s.guesses);
  const [invalidToggle, setInvalidToggle] = useState(false);
  const canToggleHardMode = guesses.reduce(
    (acc, question) =>
      acc && question.reduce((qAcc, guess) => qAcc && guess.length === 0, true),
    true
  );

  return (
    <>
      <Snackbar
        open={invalidToggle}
        onClose={() => setInvalidToggle(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        message={HARD_MODE_ALERT_MESSAGE}
      />
      <SettingsSwitch
        label={HARD_MODE_LABEL}
        caption={HARD_MODE_DESCRIPTION}
        checked={hardMode}
        onChange={() => {
          if (canToggleHardMode) {
            toggleHardMode();
          } else {
            setInvalidToggle(true);
          }
        }}
      />
    </>
  );
};

export default HardModeSwitch;
