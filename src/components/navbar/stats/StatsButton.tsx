import { IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { LeaderboardOutlined } from "@mui/icons-material";
import StatsDialog from "./StatsDialog";
import useStatsStore from "../../../stores/statsStore";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StatsButton = () => {
  const { statsOpen, openStats, closeStats } = useStatsStore();
  const handleClickOpen = () => {
    openStats();
  };

  const handleClose = () => {
    closeStats();
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
        open={statsOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default StatsButton;
