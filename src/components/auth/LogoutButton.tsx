import { useDiscord } from "../../contexts/DiscordContext";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { LOGOUT_ARIA } from "../../constants/strings";

interface LogoutButtonProps {
  startEdge?: boolean;
  maxLeftShift?: boolean;
}

const LogoutButton = ({ startEdge, maxLeftShift }: LogoutButtonProps) => {
  const { logout, isAuthenticated } = useDiscord();

  // Don't show logout button if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={LOGOUT_ARIA}
      onClick={() => logout()}
      sx={{ width: "max-content", pl: maxLeftShift ? 0 : undefined }}
    >
      <LogoutIcon fontSize="large" />
    </IconButton>
  );
};

export default LogoutButton;
