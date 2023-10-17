import { IconButton } from "@mui/material";
import React from "react";
import SettingsDialog from "./SettingsDialog";
import SettingsRoundedIcon from "@mui/icons-material/Settings";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsButton = () => {
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
        aria-label="settings"
        sx={{ mr: 2 }}
        onClick={handleClickOpen}
      >
        <SettingsRoundedIcon fontSize="large" />
      </IconButton>
      <SettingsDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </div>
  );
};

export default SettingsButton;
