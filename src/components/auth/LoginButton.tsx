import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

interface LoginButtonProps {
  startEdge?: boolean;
}

const LoginButton = ({ startEdge }: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="outlined">Login</Button>;
};

export default LoginButton;
