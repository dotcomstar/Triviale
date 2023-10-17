import { Dialog, List, ListItem } from "@mui/material";
import ColorModeSwitch from "./ColorModeSwitch";

export interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ open, onClose }: SettingsDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List>
        <ListItem disableGutters>
          <ColorModeSwitch />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
