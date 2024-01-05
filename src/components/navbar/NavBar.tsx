import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { GAME_TITLE } from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import HamburgerDrawer from "./drawer/HamburgerDrawer";
import HelpButton from "./help/HelpButton";
import HelpDialog from "./help/HelpDialog";
import SettingsButton from "./settings/SettingsButton";
import SettingsDialog from "./settings/SettingsDialog";
import StatsButton from "./stats/StatsButton";
import StatsDialog from "./stats/StatsDialog";
import LandingDialog from "../landingPage/LandingDialog";

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
    isLandingOpen,
    setLandingOpen,
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
      >
        <Stack direction="row" alignItems="center">
          <HamburgerDrawer size={matches ? "large" : "small"} />
          {matches && (
            <Paper elevation={0} sx={{ width: "calc(10px + min(8vw,58px))" }} />
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography translate="no" variant="h3" fontSize={"1.5REM"}>
            {GAME_TITLE}
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
      <LandingDialog
        open={isLandingOpen}
        onClose={() => setLandingOpen(false)}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default NavBar;
