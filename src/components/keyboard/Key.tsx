import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  value: string;
  fontSize?: number;
  onClick: (value: string) => void;
  width: string;
  isRevealing?: boolean;
};

const Key = ({
  children,
  value,
  onClick,
  width,
  isRevealing,
  fontSize = 20,
}: Props) => {
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
        width: { width },
        // width: "calc(((100vw - 16px) - (8 * 6px)) / 10)",
        height: "58px",
        minWidth: "20px",
        transitionDelay: isRevealing ? `${REVEAL_TIME_MS}ms` : "unset",
        p: 0,
        "&.MuiButton-contained": {
          padding: 0,
        },
        mr: "6px",
        alignContent: "center",
      }}
      variant="contained"
      color="primary"
      size="small"
    >
      <Typography sx={{ fontWeight: "bold", fontSize: fontSize }}>
        {children || value}
      </Typography>
    </Button>
  );
};

export default Key;
