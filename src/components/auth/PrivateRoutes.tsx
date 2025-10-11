import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useDiscord } from "../../contexts/DiscordContext";
import useDialogStore from "../../stores/dialogStore";
import { CircularProgress, Box } from "@mui/material";

const ProtectedElements = () => {
  const closeAllDialogs = useDialogStore((s) => s.closeAllDialogs);
  const { isAuthenticated, isLoading } = useDiscord();

  closeAllDialogs();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar hasBottomBorder />
      <Outlet />
    </>
  );
};

const PrivateRoutes = ProtectedElements;

export default PrivateRoutes;
