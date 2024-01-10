import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

interface ProfileButtonProps {
  startEdge?: boolean;
}

const ProfileButton = ({ startEdge }: ProfileButtonProps) => {
  const navigate = useNavigate();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label="Login button"
      onClick={() => navigate("/profile")}
    >
      <AccountCircle fontSize="large" />
    </IconButton>
  );
};

export default ProfileButton;
