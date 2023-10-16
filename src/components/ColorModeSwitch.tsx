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
          <FormControlLabel control={<Switch />} label="Dark Mode" />
        </FormGroup>
        {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton> */}
      </Tooltip>
    </Stack>
  );
};

export default ColorModeSwitch;
