import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import ThemedLayout from "../ThemedLayout";
import NavBar from "../navbar/NavBar";

const PrivateRoutes = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return (
    <ThemedLayout>
      <NavBar hasBottomBorder />
      <Outlet />
    </ThemedLayout>
  );
};

export default PrivateRoutes;
