import { IconButton } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import HelpDialog from "./HelpDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="help"
        sx={{ mr: 2 }}
        onClick={handleClickOpen}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
      <HelpDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </div>
  );
};

export default HelpButton;
