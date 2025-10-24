import { useDiscord } from "../../../contexts/DiscordContext";
import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  HELP_TITLE,
  STATISTICS_TITLE,
  SUBSCRIBE_TEXT,
} from "../../../constants/strings";
import useDialogStore from "../../../stores/dialogStore";
import LoginButton from "../../auth/LoginButton";
import LogoutButton from "../../auth/LogoutButton";
import HelpButton from "../help/HelpButton";
import StatsButton from "../stats/StatsButton";
import SubscribeButton from "./SubscribeButton";
import { MOBILE_SCREEN_CUTOFF } from "../../../constants/settings";

const HamburgerDrawer = ({ size }: { size?: "small" | "large" }) => {
  const { isAuthenticated, login, logout, sdk } = useDiscord();
  const [expanded, setExpanded] = useState(false);
  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setExpanded(open);
    };

  const list = () => {
    const { setHelpOpen, setStatsOpen } = useDialogStore();
    return (
      <Box
        sx={{ width: 250, height: "200" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <IconButton
          aria-label="close"
          onClick={toggleDrawer(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {!isAuthenticated && (
            <ListItemButton
              sx={{ justifyContent: "space-between" }}
              onClick={() => login()}
            >
              <LoginButton startEdge />
              <ListItemText primary={"Login"} />
            </ListItemButton>
          )}
          {isAuthenticated && (
            <ListItemButton
              sx={{ justifyContent: "space-between" }}
              onClick={() => logout()}
            >
              <LogoutButton startEdge />
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          )}
          <ListItemButton
            onClick={async (e) => {
              e.stopPropagation(); // Prevent drawer from closing
              try {
                if (sdk) {
                  // Use Discord SDK to open external URL
                  await sdk.commands.openExternalLink({
                    url: 'https://www.buymeacoffee.com/jetrlee',
                  });
                } else {
                  // Fallback for non-Discord environment
                  window.open('https://www.buymeacoffee.com/jetrlee', '_blank');
                }
              } catch (error) {
                console.error('Failed to open subscribe link:', error);
              }
            }}
            sx={{ justifyContent: "space-between", cursor: "pointer" }}
          >
            <SubscribeButton startEdge />
            <ListItemText primary={SUBSCRIBE_TEXT} />
          </ListItemButton>
          <ListItemButton
            onClick={() => setHelpOpen(true)}
            sx={{ justifyContent: "space-between" }}
          >
            <HelpButton startEdge />
            <ListItemText primary={HELP_TITLE} />
          </ListItemButton>
          <ListItemButton onClick={() => setStatsOpen(true)}>
            <StatsButton startEdge />
            <ListItemText primary={STATISTICS_TITLE} />
          </ListItemButton>
        </List>
      </Box>
    );
  };

  return (
    <div>
      <React.Fragment key={"drawer"}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuRoundedIcon fontSize={size} />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={expanded}
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiDrawer-paper': !isNotMobile ? {
              marginTop: '60px',
              height: 'calc(100% - 60px)'
            } : {}
          }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default HamburgerDrawer;
