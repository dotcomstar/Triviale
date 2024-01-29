import { Box, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import ProfileButton from "../auth/ProfileButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/LoginButton";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";

interface NavBarProps {
  hasBottomBorder?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBar = ({ hasBottomBorder }: NavBarProps) => {
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

  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction="row"
        paddingX="10px"
        paddingBottom={matches ? "10px" : "0px"}
        paddingTop={matches ? "10px" : "4px"}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: hasBottomBorder ? 1 : 0, borderColor: "DarkGray" }}
        px="calc(max(3vw,20px))"
      >
        <Stack direction="row" alignItems="center">
          <HamburgerDrawer size={matches ? "large" : "small"} />
          {matches && <Paper elevation={0} />}
        </Stack>
        <Box onClick={() => navigate("/")}>
          <Typography
            translate="no"
            variant="h3"
            fontSize={"1.5REM"}
            position={"absolute"}
            left={matches ? "45vw" : "40vw"}
            top={matches ? "15px" : "10px"}
          >
            {GAME_TITLE}
          </Typography>
        </Box>
        {matches ? (
          <Stack direction="row" alignItems="center">
            <HelpButton />
            <StatsButton />
            <SettingsButton />
            {isAuthenticated ? <ProfileButton /> : <LoginButton />}
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center">
            <SettingsButton size="small" />
            {isAuthenticated ? (
              <ProfileButton size="small" />
            ) : (
              <LoginButton size="small" />
            )}
          </Stack>
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
