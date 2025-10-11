import { useDiscord } from "../../contexts/DiscordContext";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { LOGIN_ARIA } from "../../constants/strings";

interface LoginButtonProps {
  startEdge?: boolean;
  color?: IconButtonOwnProps["color"];
  size?: "small" | "large";
}

const LoginButton = ({
  startEdge,
  color,
  size = "large",
}: LoginButtonProps) => {
  const { login, isAuthenticated, sdk } = useDiscord();

  // Don't show login button if not in Discord or already authenticated
  if (!sdk || isAuthenticated) {
    return null;
  }

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color={color ? color : "inherit"}
      aria-label={LOGIN_ARIA}
      onClick={() => login()}
    >
      <LoginIcon fontSize={size} />
    </IconButton>
  );
};

export default LoginButton;
