import { useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../ThemedLayout";
import SettingsSwitch from "./SettingsSwitch";

const ColorModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <SettingsSwitch
      label="Dark Theme"
      checked={theme.palette.mode === "dark"}
      onChange={colorMode.toggleColorMode}
    />
  );
};

export default ColorModeSwitch;
