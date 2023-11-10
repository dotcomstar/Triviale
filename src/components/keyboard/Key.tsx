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
  id?: string;
  status?: ButtonOwnProps["color"];
  autoFocus?: boolean;
};

const Key = ({
  children,
  value,
  onClick,
  width,
  isRevealing,
  id,
  status = undefined,
  fontSize = 20,
  autoFocus = false,
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
        alignContent: "center",
        overflow: "clip",
      }}
      variant="contained"
      disableElevation
      size="small"
      color={status}
      id={id}
      disableFocusRipple={!!id}
      autoFocus={autoFocus}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: fontSize }}>
        {children || value}
      </Typography>
    </Button>
  );
};

export default Key;
