import { DialogProps, Divider, List, ListItem } from "@mui/material";
import ColorModeSwitch from "./ColorModeSwitch";
import HardModeSwitch from "./HardModeSwitch";
import HighContrastSwitch from "./HighContrastSwitch";
import CustomDialog from "../CustomDialog";
import {
  SETTINGS_DIALOG_ARIA,
  SETTINGS_TITLE,
} from "../../../constants/strings";

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
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={SETTINGS_DIALOG_ARIA}
      ariaLabeledBy={SETTINGS_TITLE}
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
    </CustomDialog>
  );
};

export default SettingsDialog;
