import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@mui/material";
import { HELP_BUTTON_ARIA } from "../../../constants/strings";
import useDialogStore from "../../../stores/dialogStore";

const HelpButton = ({ startEdge = false }: { startEdge?: boolean }) => {
  const setHelpOpen = useDialogStore((s) => s.setHelpOpen);
  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={HELP_BUTTON_ARIA}
      onClick={() => setHelpOpen(true)}
    >
      <HelpOutlineIcon fontSize="large" />
    </IconButton>
  );
};

export default HelpButton;
