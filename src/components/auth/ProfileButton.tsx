import { useDiscord } from "../../contexts/DiscordContext";
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
  const { user, isAuthenticated } = useDiscord();

  // Don't show profile button if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Get Discord avatar URL
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : undefined;

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
      <Avatar
        src={avatarUrl}
        alt={user.global_name || user.username}
        sx={{
          bgcolor: "primary.contrastText",
          height: size === "small" ? 20 : 35,
          width: size === "small" ? 20 : 35,
        }}
      >
        {!avatarUrl && (user.global_name?.[0] || user.username[0])}
      </Avatar>
    </IconButton>
  );
};

export default ProfileButton;
