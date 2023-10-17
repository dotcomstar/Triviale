import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../components/ThemedLayout";

const ColorModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Stack direction="row">
      <Tooltip title="Toggle dark mode">
        <FormGroup>
          <FormControlLabel
            control={<Switch />}
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
            label="Dark Theme"
          />
        </FormGroup>
      </Tooltip>
    </Stack>
  );
};

export default ColorModeSwitch;
