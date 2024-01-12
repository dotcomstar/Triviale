import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import {
  HELP_TITLE,
  PLACEHOLDER_TEXT,
  STATISTICS_TITLE,
  SUBSCRIBE_TEXT,
  SUBSCRIPTIONS_TEXT,
} from "../../../constants/strings";
import useDialogStore from "../../../stores/dialogStore";
import LoginButton from "../../auth/LoginButton";
import HelpButton from "../help/HelpButton";
import StatsButton from "../stats/StatsButton";
import { useAuth0 } from "@auth0/auth0-react";
import SubscribeButton from "./SubscribeButton";
import LogoutButton from "../../auth/LogoutButton";
import { ALERT_TIME_MS } from "../../../constants/settings";

const HamburgerDrawer = ({ size }: { size?: "small" | "large" }) => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [expanded, setExpanded] = useState(false);
  const [showingMessage, setShowingMessage] = useState(false);
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
            <ListItem
              sx={{ justifyContent: "space-between" }}
              onClick={() => loginWithRedirect()}
            >
              <LoginButton startEdge />
              <ListItemText primary={"Login"} />
            </ListItem>
          )}
          {isAuthenticated && (
            <ListItem
              sx={{ justifyContent: "space-between" }}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <LogoutButton startEdge />
              <ListItemText primary={"Log Out"} />
            </ListItem>
          )}

          <ListItem
            sx={{ justifyContent: "space-between" }}
            onClick={() => setShowingMessage(true)}
          >
            <SubscribeButton
              startEdge
              onClick={() => setShowingMessage(true)}
            />
            <ListItemText primary={SUBSCRIBE_TEXT} />
          </ListItem>
          <ListItem
            onClick={() => setHelpOpen(true)}
            sx={{ justifyContent: "space-between" }}
          >
            <HelpButton startEdge />
            <ListItemText primary={HELP_TITLE} />
          </ListItem>
          <ListItem onClick={() => setStatsOpen(true)}>
            <StatsButton startEdge />
            <ListItemText primary={STATISTICS_TITLE} />
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <div>
      <Snackbar
        open={showingMessage}
        onClose={() => setShowingMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={ALERT_TIME_MS}
        message={`${SUBSCRIPTIONS_TEXT} ${PLACEHOLDER_TEXT.toLocaleLowerCase()}`}
      />
      <React.Fragment key={"drawer"}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuRoundedIcon fontSize={size} />
        </IconButton>
        <Drawer anchor={"left"} open={expanded} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default HamburgerDrawer;
