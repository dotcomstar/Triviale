import { IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { LeaderboardOutlined } from "@mui/icons-material";
import StatsDialog from "./StatsDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StatsButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="help"
        onClick={handleClickOpen}
      >
        <LeaderboardOutlined fontSize="large" />
      </IconButton>
      <StatsDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default StatsButton;
