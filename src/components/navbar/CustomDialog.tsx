import { Dialog, DialogProps } from "@mui/material";
import { ReactNode } from "react";

export interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
  ariaDescribedBy: string;
  children: ReactNode;
}

const CustomDialog = ({
  open,
  onClose,
  TransitionComponent,
  ariaDescribedBy,
  children,
}: CustomDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      aria-describedby={ariaDescribedBy}
      keepMounted
      fullWidth
      maxWidth="sm"
      sx={{ zIndex: "modal", mx: 0 }}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
