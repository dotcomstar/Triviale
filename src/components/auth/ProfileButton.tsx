import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { PROFILE_ARIA } from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";

interface ProfileButtonProps {
  startEdge?: boolean;
  size?: "large" | "small";
}

const ProfileButton = ({ startEdge, size }: ProfileButtonProps) => {
  const navigate = useNavigate();
  const closeAllDialogs = useDialogStore((s) => s.closeAllDialogs);
  const { user, isAuthenticated } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={PROFILE_ARIA}
      onClick={() => {
        closeAllDialogs();
        navigate("/profile");
      }}
    >
      {isAuthenticated && (
        <Avatar
          src={user?.picture}
          alt={user?.name}
          sx={{
            bgcolor: "primary.contrastText",
            height: size === "small" ? 20 : 35,
            width: size === "small" ? 20 : 35,
          }}
        />
      )}
    </IconButton>
  );
};

export default ProfileButton;
