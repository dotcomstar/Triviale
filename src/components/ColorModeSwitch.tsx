import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../components/ThemedLayout";

const ColorModeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Stack direction="row">
      <Tooltip title="Toggle dark mode">
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ColorModeSwitch;
