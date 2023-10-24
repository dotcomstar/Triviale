import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";
import { REVEAL_TIME_MS } from "../../constants/settings";

type Props = {
  children?: ReactNode;
  value: string;
  fontSize?: number;
  onClick: (value: string) => void;
  width: string;
  isRevealing?: boolean;
  hasNext?: boolean;
};

const Key = ({
  children,
  value,
  onClick,
  width,
  isRevealing,
  fontSize = 20,
  hasNext = false,
}: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };
  const status = undefined;

  return (
    <Button
      aria-label={`${value} key`}
      onClick={handleClick}
      sx={{
        width: { width },
        height: "58px",
        minWidth: "20px",
        transitionDelay: isRevealing ? `${REVEAL_TIME_MS}ms` : "unset",
        p: 0,
        "&.MuiButton-contained": {
          padding: 0,
        },
        mr: hasNext ? "6px" : "0px",
        alignContent: "center",
        overflow: "clip",
      }}
      variant="contained"
      size="small"
      color={status}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: fontSize }}>
        {children || value}
      </Typography>
    </Button>
  );
};

export default Key;
