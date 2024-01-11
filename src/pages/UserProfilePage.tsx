import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Typography } from "@mui/material";

const UserProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  return (
    isAuthenticated && (
      <Stack direction={"column"}>
        <img
          height={"100px"}
          width={"100px"}
          src={user?.picture}
          alt={user?.name}
        />
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
      </Stack>
    )
  );
};

export default UserProfilePage;
