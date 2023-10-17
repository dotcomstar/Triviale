import { DialogProps, DialogTitle, Typography } from "@mui/material";
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
      <DialogTitle> How To Play</DialogTitle>
      <Typography sx={{ m: 3, mt: 0 }}>
        Guess the answer in 5 tries. Total of 3 questions per day.
      </Typography>
    </CustomDialog>
  );
};

export default HelpDialog;
