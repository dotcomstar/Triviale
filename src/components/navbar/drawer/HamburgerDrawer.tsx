import React from "react";
import MenuRoundedIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const HamburgerDrawer = () => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [expanded, setExpanded] = React.useState(false);
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

  const list = () => (
    <Box
      sx={{ width: 250, height: "200" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"drawer"}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuRoundedIcon fontSize="large" />
        </IconButton>{" "}
        <SwipeableDrawer
          anchor={"left"}
          open={expanded}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          // From: https://mui.com/material-ui/react-drawer/
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          //- iOS is hosted on high-end devices. The backdrop transition can be enabled without dropping frames. The performance will be good enough.
          //- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default HamburgerDrawer;
