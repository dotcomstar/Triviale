import { IconButton } from "@mui/material";
import React from "react";
import SettingsDialog from "./SettingsDialog";
import SettingsRoundedIcon from "@mui/icons-material/Settings";

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
      <SettingsDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default SettingsButton;
