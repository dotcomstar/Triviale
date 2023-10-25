import { Button, ButtonOwnProps, Typography } from "@mui/material";
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
  status?: ButtonOwnProps["color"];
};

const Key = ({
  children,
  value,
  onClick,
  width,
  isRevealing,
  status = undefined,
  fontSize = 20,
  hasNext = false,
}: Props) => {
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
        height: "58px",
        minWidth: "20px",
        transitionDelay: isRevealing ? `${REVEAL_TIME_MS}ms` : "unset",
        mr: hasNext ? "6px" : "0px",
        alignContent: "center",
        overflow: "clip",
      }}
      variant="contained"
      disableElevation
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
