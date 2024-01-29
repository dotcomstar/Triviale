import { Button, ButtonOwnProps, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";

interface LandingButtonProps {
  children: ReactNode;
  color: ButtonOwnProps["color"];
  onClick: () => void;
  // variant?: "contained" | "text" | "outlined";
  variant?: ButtonOwnProps["variant"];
}

const LandingButton = ({
  children,
  onClick,
  color,
  variant = "contained",
}: LandingButtonProps) => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  return (
    <Button
      sx={{
        borderRadius: 10,
        width: matches ? "20vw" : "50vw",
        fontWeight: "semibold",
        height: "8vh",
      }}
      variant={variant}
      color={color}
      onClick={onClick}
      disableElevation
    >
      {children}
    </Button>
  );
};

export default LandingButton;
