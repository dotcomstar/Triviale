import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Typography } from "@mui/material";
import LogoutButton from "../components/auth/LogoutButton";
import EditingButton from "../components/question/EditingButton";

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
        <img
          height={"100px"}
          width={"100px"}
          src={user?.picture}
          alt={user?.name}
        />
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <EditingButton />
        <LogoutButton startEdge maxLeftShift />
      </Stack>
    )
  );
};

export default UserProfilePage;
