import {
  Dialog,
  DialogProps,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ReactNode, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";

export interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
  ariaDescribedBy: string;
  ariaLabeledBy: string;
  children: ReactNode;
  dialogTitle?: string;
  fullScreen?: boolean;
  centerTitle?: boolean;
  zIndex?: string;
  backgroundColor?: string;
}

const CustomDialog = ({
  open,
  onClose,
  TransitionComponent,
  ariaDescribedBy,
  children,
  ariaLabeledBy,
  dialogTitle = "",
  fullScreen = false,
  centerTitle = false,
  zIndex = "modal",
  backgroundColor,
}: CustomDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const theme = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);

  // Reset scroll to top when dialog opens
  useEffect(() => {
    if (open && dialogRef.current) {
      const dialogContent = dialogRef.current.querySelector('.MuiDialog-paper');
      if (dialogContent) {
        dialogContent.scrollTop = 0;
      }
    }
  }, [open]);

  return (
    <Dialog
      ref={dialogRef}
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabeledBy}
      keepMounted
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      sx={{
        zIndex: zIndex,
        mx: 0,
        pb: fullScreen ? 0 : 2,
        // On mobile fullscreen, add top padding for Discord header
        '& .MuiDialog-paper': fullScreen && !isNotMobile ? {
          marginTop: '60px',
          height: 'calc(100% - 60px)'
        } : {}
      }}
      PaperProps={{
        style: {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.palette.info.dark,
          backgroundImage: "unset",
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "28px", pb: dialogTitle ? 0 : 1 }}
        justifyContent={centerTitle ? "center" : undefined}
        display={"flex"}
      >
        {dialogTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 10,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default CustomDialog;
