import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";

interface LoginButtonProps {
  startEdge?: boolean;
}

const LoginButton = ({ startEdge }: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label="Login button"
      onClick={() => loginWithRedirect()}
    >
      <InboxIcon fontSize="large" />
    </IconButton>
  );
};

export default LoginButton;
