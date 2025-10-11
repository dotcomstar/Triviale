import { useDiscord } from "../../contexts/DiscordContext";
import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MOBILE_SCREEN_CUTOFF,
  THEME_TRANSITION_TIME_MS,
} from "../../constants/settings";
import { GAME_TITLE } from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import useEditingStore from "../../stores/editingStore";
import LoginButton from "../auth/LoginButton";
import ProfileButton from "../auth/ProfileButton";
import LandingDialog from "../landingPage/LandingDialog";
import HamburgerDrawer from "./drawer/HamburgerDrawer";
import HelpButton from "./help/HelpButton";
import HelpDialog from "./help/HelpDialog";
import SettingsButton from "./settings/SettingsButton";
import SettingsDialog from "./settings/SettingsDialog";
import StatsButton from "./stats/StatsButton";
import StatsDialog from "./stats/StatsDialog";

interface NavBarProps {
  hasBottomBorder?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>;
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
  const editing = useEditingStore((s) => s.editing);
  const theme = useTheme();

  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const { isAuthenticated } = useDiscord();
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction="row"
        paddingX="10px"
        paddingBottom={isNotMobile ? "10px" : "0px"}
        paddingTop={isNotMobile ? "10px" : "4px"}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: hasBottomBorder ? 1 : 0, borderColor: "DarkGray" }}
        px="calc(max(3vw,20px))"
      >
        <Stack direction="row" alignItems="center">
          <HamburgerDrawer size={isNotMobile ? "large" : "small"} />
          {isNotMobile && <Paper elevation={0} />}
        </Stack>
        <Box onClick={() => navigate("/")}>
          <Typography
            translate="no"
            variant="h3"
            fontSize={"1.5REM"}
            position={"absolute"}
            left={isNotMobile ? "45vw" : "40vw"}
            top={isNotMobile ? "15px" : "10px"}
            color={editing ? "info.main" : "primary.contrastText"}
            sx={{
              transition: () =>
                theme.transitions.create("color", {
                  duration: `${THEME_TRANSITION_TIME_MS}ms`,
                }),
            }}
          >
            {GAME_TITLE}
          </Typography>
        </Box>
        {isNotMobile ? (
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
