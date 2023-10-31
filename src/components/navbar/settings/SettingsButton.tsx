import SettingsRoundedIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { SETTINGS_BUTTON_ARIA } from "../../../constants/strings";
import useDialogStore from "../../../stores/dialogStore";

const SettingsButton = ({ size = "large" }: { size?: "small" | "large" }) => {
  const setSettingsOpen = useDialogStore((s) => s.setSettingsOpen);

  return (
    <IconButton
      edge="end"
      color="inherit"
      aria-label={SETTINGS_BUTTON_ARIA}
      onClick={() => setSettingsOpen(true)}
    >
      <SettingsRoundedIcon fontSize={size} />
    </IconButton>
  );
};

export default SettingsButton;
