import { Dialog, DialogProps, Divider, List, ListItem } from "@mui/material";
import ColorModeSwitch from "./ColorModeSwitch";
import HardModeSwitch from "./HardModeSwitch";
import HighContrastSwitch from "./HighContrastSwitch";

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const SettingsDialog = ({
  open,
  onClose,
  TransitionComponent,
}: SettingsDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      keepMounted
      aria-describedby="settings-dialog-slide"
      fullWidth
      maxWidth="sm"
    >
      <List>
        <ListItem>
          <HardModeSwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <ColorModeSwitch />
        </ListItem>
        <Divider component="li" sx={{ mx: 2 }} />
        <ListItem>
          <HighContrastSwitch />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
