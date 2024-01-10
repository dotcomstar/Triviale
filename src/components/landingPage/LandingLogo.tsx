import { Stack, Typography, useTheme } from "@mui/material";
import { GAME_TITLE } from "../../constants/strings";
import Cell from "../grid/Cell";

const LandingLogo = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography translate="no" variant="h3">
        <Cell
          value={GAME_TITLE.toLocaleUpperCase()[0]}
          status={theme.palette.success}
          nthLetter={1}
          fontSizeOverride="10vw"
          isH3
        />
      </Typography>
      <Typography
        translate="no"
        variant="h3"
        sx={{ fontSize: "12vw" }}
        fontWeight={"bold"}
        justifyContent={"center"}
        display={"flex"}
      >
        {GAME_TITLE.slice(1)}
      </Typography>
    </Stack>
  );
};

export default LandingLogo;
