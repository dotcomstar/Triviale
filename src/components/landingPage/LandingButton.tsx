import { Button, ButtonOwnProps, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

interface LandingButtonProps {
  children: ReactNode;
  color: ButtonOwnProps["color"];
  onClick: () => void;
}

const LandingButton = ({ children, color, onClick }: LandingButtonProps) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Button
      sx={{
        borderRadius: 10,
        width: matches ? "25%" : "35%",
        fontWeight: "semibold",
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
