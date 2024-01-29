import { Button, ButtonOwnProps, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";

interface LandingButtonProps {
  children: ReactNode;
  color: ButtonOwnProps["color"];
  onClick: () => void;
}

const LandingButton = ({ children, color, onClick }: LandingButtonProps) => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  return (
    <Button
      sx={{
        borderRadius: 10,
        width: matches ? "20vw" : "50vw",
        fontWeight: "semibold",
        height: "8vh",
      }}
      variant="contained"
      color={color}
      onClick={onClick}
      disableElevation
    >
      {children}
    </Button>
  );
};

export default LandingButton;
