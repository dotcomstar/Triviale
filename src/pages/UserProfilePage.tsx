import { useAuth0 } from "@auth0/auth0-react";
import { Link, Stack, Typography } from "@mui/material";
import LogoutButton from "../components/auth/LogoutButton";
import EditingButton from "../components/question/EditingButton";
import {
  CONTACT_EMAIL,
  DELETE_USER_PROFILE_TEXT,
  PROFILE_PAGE_TITLE,
} from "../constants/strings";

const UserProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    console.log("Loading page");
    return <div>Loading ...</div>;
  }

  console.log(user);
  return (
    isAuthenticated && (
      <Stack direction={"column"} alignItems={"left"} sx={{ m: 4 }} spacing={1}>
        <Typography variant="h4">{PROFILE_PAGE_TITLE}</Typography>
        <img
          height={"100px"}
          width={"100px"}
          src={user?.picture}
          alt={user?.name}
        />
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <EditingButton />

        <Link
          href={`mailto:${CONTACT_EMAIL}?subject=${DELETE_USER_PROFILE_TEXT} ${user?.email}&body=%0D%0A%0D%0A%0A--%0A`}
          title={`Send profile deletion request to ${CONTACT_EMAIL}`}
          color={"inherit"}
          target="_blank"
          rel="noopener"
        >
          {DELETE_USER_PROFILE_TEXT}
        </Link>
        <LogoutButton startEdge maxLeftShift />
      </Stack>
    )
  );
};

export default UserProfilePage;
