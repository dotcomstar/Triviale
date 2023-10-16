import { AccountCircle } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import logo from "/jacks_its_ac_design.webp";
// import useAuthStore from "../auth/store";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  //   const user = useAuthStore();
  return (
    <Stack
      direction="row"
      padding="10px"
      justifyContent="space-between"
      bgcolor="#ff5c6d" // TODO: Extract this to a variable
    >
      <Stack direction="row">
        <Box
          component="img"
          sx={{
            width: 60,
            height: 60,
            borderRadius: 2.6,
          }}
          alt="ScheduleTerp's logo"
          src={logo}
        />
        <Button variant="text" aria-label="About" color="info">
          About
        </Button>
      </Stack>
      <Stack direction="row">
        <ColorModeSwitch />
      </Stack>
    </Stack>
  );
};

export default NavBar;
