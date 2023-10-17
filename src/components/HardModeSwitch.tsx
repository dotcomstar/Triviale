import { FormControl, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../components/ThemedLayout";
import IOSSwitch from "./IOSSwitch";

const HardModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <FormControl fullWidth={true}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography>Hard Mode</Typography>
          <Typography variant="caption">
            Only one answer per question
          </Typography>
        </Stack>
        <IOSSwitch
          checked={theme.palette.mode === "dark"}
          onChange={colorMode.toggleColorMode}
        />
      </Stack>
    </FormControl>
  );
};

export default HardModeSwitch;
