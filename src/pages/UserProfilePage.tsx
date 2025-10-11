import { useDiscord } from "../contexts/DiscordContext";
import { Link, Stack, Typography, Avatar } from "@mui/material";
import LogoutButton from "../components/auth/LogoutButton";
import EditingButton from "../components/question/EditingButton";
import {
  CONTACT_EMAIL,
  DELETE_USER_PROFILE_TEXT,
  PROFILE_PAGE_TITLE,
} from "../constants/strings";

const UserProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useDiscord();

  if (isLoading) {
    console.log("Loading page");
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Not authenticated</div>;
  }

  // Get Discord avatar URL
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : undefined;

  const displayName = user.global_name || user.username;
  const userIdentifier = `${user.username}#${user.discriminator}`;

  console.log(user);
  return (
    <Stack direction={"column"} alignItems={"left"} sx={{ m: 4 }} spacing={1}>
      <Typography variant="h4">{PROFILE_PAGE_TITLE}</Typography>
      <Avatar
        src={avatarUrl}
        alt={displayName}
        sx={{
          height: 100,
          width: 100,
        }}
      >
        {!avatarUrl && displayName[0]}
      </Avatar>
      <Typography variant="h6">{displayName}</Typography>
      <Typography variant="body2" color="text.secondary">
        {userIdentifier}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Discord ID: {user.id}
      </Typography>
      <EditingButton />

      <Link
        href={`mailto:${CONTACT_EMAIL}?subject=${DELETE_USER_PROFILE_TEXT} ${userIdentifier}&body=%0D%0A%0D%0A%0A--%0A`}
        title={`Send profile deletion request to ${CONTACT_EMAIL}`}
        color={"inherit"}
        target="_blank"
        rel="noopener"
      >
        {DELETE_USER_PROFILE_TEXT}
      </Link>
      <LogoutButton startEdge maxLeftShift />
    </Stack>
  );
};

export default UserProfilePage;
