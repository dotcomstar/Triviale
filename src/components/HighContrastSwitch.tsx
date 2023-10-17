import { FormControl, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../components/ThemedLayout";
import IOSSwitch from "./IOSSwitch";

const HighContrastSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <FormControl fullWidth={true}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography>High Contrast Mode</Typography>
          <Typography variant="caption">For improved color vision</Typography>
        </Stack>
        <IOSSwitch
          checked={theme.palette.mode === "dark"}
          onChange={colorMode.toggleColorMode}
        />
      </Stack>
    </FormControl>
  );
};

export default HighContrastSwitch;
