import {
  DialogProps,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CustomDialog from "./CustomDialog";

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
      ariaDescribedBy="help-dialog-slide"
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "28px", pb: 0 }}>
        How To Play
      </DialogTitle>
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        Guess each answer in 5 tries.
      </Typography>
      <List sx={{ listStyleType: "disc", mx: 6, mt: 0, pb: 3 }}>
        <ListItem sx={{ display: "list-item" }}>
          Total of 3 questions per day.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          The color of the tiles will change to show how close your guess was to
          the word.
        </ListItem>
      </List>
    </CustomDialog>
  );
};

export default HelpDialog;
