import { Stack, Typography, useTheme } from "@mui/material";
import { GAME_TITLE } from "../../constants/strings";
import Cell from "../grid/Cell";

interface LandingLogoProps {
  fontColor: string;
}

const LandingLogo = ({ fontColor }: LandingLogoProps) => {
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
          fontColor={fontColor}
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
