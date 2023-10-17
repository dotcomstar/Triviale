import { Box, IconButton, Stack, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/Menu";
import logo from "/jacks_its_ac_design.webp";
import SettingsButton from "./SettingsButton";
import HelpButton from "./HelpButton";

const NavBar = () => {
  return (
    <Stack
      direction="row"
      padding="10px"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: 1, borderColor: "DarkGray" }}
      px={2}
    >
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
      <Stack direction="row">
        <Box
          component="img"
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2.6,
          }}
          alt="Triviale Logo"
          src={logo}
        />
        <Typography translate="no" variant="h3" alignItems={"center"}>
          Triviale
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <HelpButton />
        <SettingsButton />
      </Stack>
    </Stack>
  );
};

export default NavBar;
