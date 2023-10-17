import { Box, Stack, Typography } from "@mui/material";
import HamburgerDrawer from "./drawer/HamburgerDrawer";
import HelpButton from "./help/HelpButton";
import SettingsButton from "./settings/SettingsButton";
import logo from "/jacks_its_ac_design.webp";

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
      <HamburgerDrawer />
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
