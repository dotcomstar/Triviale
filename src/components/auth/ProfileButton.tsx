import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";

interface ProfileButtonProps {
  startEdge?: boolean;
}

const ProfileButton = ({ startEdge }: ProfileButtonProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label="Login button"
      onClick={() => navigate("/profile")}
    >
      {isAuthenticated && (
        <Avatar
          src={user?.picture}
          alt={user?.name}
          sx={{ bgcolor: "primary.contrastText", height: 35, width: 35 }}
        />
      )}
    </IconButton>
  );
};

export default ProfileButton;
