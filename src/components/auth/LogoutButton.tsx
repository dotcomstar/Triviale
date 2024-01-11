import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

interface LogoutButtonProps {
  startEdge?: boolean;
}

const LogoutButton = ({ startEdge }: LogoutButtonProps) => {
  const { logout } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label="Logout button"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <LogoutIcon fontSize="large" />
    </IconButton>
  );
};

export default LogoutButton;
