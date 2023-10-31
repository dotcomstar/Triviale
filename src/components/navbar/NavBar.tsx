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
  return (
    <>
      <Stack
        direction="row"
        paddingX="10px"
        paddingBottom={matches ? "10px" : "0px"}
        paddingTop={matches ? "10px" : "4px"}
        justifyContent="space-between"
        alignItems="center"
        px="calc(max(3vw,20px))"
        // sx={{ borderBottom: 1, borderColor: "darkgray" }}
      >
        <Stack direction="row" alignItems="center">
          <HamburgerDrawer size={matches ? "large" : "small"} />
          {matches && <Paper elevation={0} sx={{ width: "43px" }} />}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            component="img"
            sx={{
              width: "calc(min(8vw,58px))",
              height: "calc(min(8vw,58px))",
              borderRadius: 2.6,
            }}
            alt="Triviale Logo"
            src={logo}
          />
          <Typography translate="no" variant="h3" fontSize={"1.5REM"}>
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
          <SettingsButton size="small" />
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
