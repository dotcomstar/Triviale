import { DialogProps, List, ListItem, Typography } from "@mui/material";
import {
  HELP_DIALOG_ARIA,
  HELP_HOW_TILE_COLORS_CHANGE,
  HELP_HOW_TO_PLAY,
  HELP_NUM_QUESTIONS,
  HELP_NUM_TRIES,
  HELP_TITLE,
} from "../../../constants/strings";
import CustomDialog from "../CustomDialog";

export interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const HelpDialog = ({
  open,
  onClose,
  TransitionComponent,
}: HelpDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
      ariaLabeledBy={HELP_TITLE}
      dialogTitle={HELP_HOW_TO_PLAY}
    >
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        {HELP_NUM_TRIES}
      </Typography>
      <List sx={{ listStyleType: "disc", mx: 6, mt: 0, pb: 3 }}>
        <ListItem sx={{ display: "list-item" }}>{HELP_NUM_QUESTIONS}</ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {HELP_HOW_TILE_COLORS_CHANGE}
        </ListItem>
      </List>
    </CustomDialog>
  );
};

export default HelpDialog;
