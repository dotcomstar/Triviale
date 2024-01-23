import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { LOGOUT_ARIA } from "../../constants/strings";

interface LogoutButtonProps {
  startEdge?: boolean;
  maxLeftShift?: boolean;
}

const LogoutButton = ({ startEdge, maxLeftShift }: LogoutButtonProps) => {
  const { logout } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={LOGOUT_ARIA}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      sx={{ width: "max-content", pl: maxLeftShift ? 0 : undefined }}
    >
      <LogoutIcon fontSize="large" />
    </IconButton>
  );
};

export default LogoutButton;
