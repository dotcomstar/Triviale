import { Box, Button, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/jacks_its_ac_design.webp";
import SettingsButton from "./SettingsButton";

const NavBar = () => {
  return (
    <Stack
      direction="row"
      padding="10px"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: 1 }}
      px={2}
    >
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
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
      <Button variant="text" aria-label="About" color="info" translate="no">
        Triviale
      </Button>
      <SettingsButton />
    </Stack>
  );
};

export default NavBar;
