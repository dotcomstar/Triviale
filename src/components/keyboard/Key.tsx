import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  value: string;
  width?: number;
  onClick: (value: string) => void;
  isRevealing?: boolean;
};

const Key = ({ children, width = 40, value, onClick, isRevealing }: Props) => {
  const REVEAL_TIME_MS = 350;
  //   const highContrast = useHighContrastStore((state) => state.highContrast); // Only update when this value is changed.

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <Button
      aria-label={`${value} key`}
      onClick={handleClick}
      sx={{
        width: `${width}px`,
        minWidth: `${width}px`,
        transitionDelay: isRevealing ? `${REVEAL_TIME_MS}ms` : "unset",
      }}
      variant="contained"
      color="unclicked"
    >
      <Typography sx={{ fontWeight: "bold" }}>{children || value}</Typography>
    </Button>
  );
};

export default Key;
