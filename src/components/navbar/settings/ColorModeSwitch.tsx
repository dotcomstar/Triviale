import { useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../ThemedLayout";
import SettingsSwitch from "./SettingsSwitch";
import { DARK_MODE_LABEL } from "../../../constants/strings";

const ColorModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <SettingsSwitch
      label={DARK_MODE_LABEL}
      checked={theme.palette.mode === "dark"}
      onChange={colorMode.toggleColorMode}
    />
  );
};

export default ColorModeSwitch;
