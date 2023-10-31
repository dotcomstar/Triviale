import CardMembershipIcon from "@mui/icons-material/CardMembership";
import MenuRoundedIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { HELP_TITLE, STATISTICS_TITLE } from "../../../constants/strings";
import useDialogStore from "../../../stores/dialogStore";
import HelpButton from "../help/HelpButton";
import StatsButton from "../stats/StatsButton";

const HamburgerDrawer = ({ size }: { size?: "small" | "large" }) => {
  const matches = useMediaQuery("(min-width:600px)");
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

  const list = () => {
    const { setHelpOpen, setStatsOpen } = useDialogStore();
    return (
      <Box
        sx={{ width: 250, height: "200" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {matches ? (
            <>
              {["Login", "Subscribe"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => console.log(text)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <CardMembershipIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}{" "}
            </>
          ) : (
            <>
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
            </>
          )}
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
        <Drawer anchor={"left"} open={expanded} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default HamburgerDrawer;
