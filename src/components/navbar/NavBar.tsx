import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import HamburgerDrawer from "./drawer/HamburgerDrawer";
import HelpButton from "./help/HelpButton";
import HelpDialog from "./help/HelpDialog";
import SettingsButton from "./settings/SettingsButton";
import StatsButton from "./stats/StatsButton";
import logo from "/jacks_its_ac_design.webp";
import useDialogStore from "../../stores/dialogStore";
import StatsDialog from "./stats/StatsDialog";
import SettingsDialog from "./settings/SettingsDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBar = () => {
  const {
    isHelpOpen,
    setHelpOpen,
    isStatsOpen,
    setStatsOpen,
    isSettingsOpen,
    setSettingsOpen,
  } = useDialogStore();
  const matches = useMediaQuery("(min-width:600px)");
  // const [open, setOpen] = React.useState(true);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <Stack
        direction="row"
        padding="10px"
        justifyContent="space-between"
        alignItems="center"
        px="calc(max(3vw,20px))"
      >
        <Stack direction="row" alignItems="center">
          <HamburgerDrawer />
          {matches && <Paper elevation={0} sx={{ width: "43px" }} />}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="img"
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2.6,
            }}
            alt="Triviale Logo"
            src={logo}
          />
          <Typography translate="no" variant="h3">
            Triviale
          </Typography>
        </Stack>
        {matches ? (
          <Stack direction="row" alignItems="center">
            <HelpButton />
            <StatsButton />
            <SettingsButton />
          </Stack>
        ) : (
          <SettingsButton />
        )}
      </Stack>
      <HelpDialog
        open={isHelpOpen}
        onClose={() => setHelpOpen(false)}
        TransitionComponent={Transition}
      />
      <StatsDialog
        open={isStatsOpen}
        onClose={() => setStatsOpen(false)}
        TransitionComponent={Transition}
      />
      <SettingsDialog
        open={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default NavBar;
