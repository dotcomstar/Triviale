import { useAuth0 } from "@auth0/auth0-react";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { LOGIN_ARIA } from "../../constants/strings";

interface LoginButtonProps {
  startEdge?: boolean;
  color?: IconButtonOwnProps["color"];
}

const LoginButton = ({ startEdge, color }: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color={color ? color : "inherit"}
      aria-label={LOGIN_ARIA}
      onClick={() => loginWithRedirect()}
    >
      <LoginIcon fontSize="large" />
    </IconButton>
  );
};

export default LoginButton;
