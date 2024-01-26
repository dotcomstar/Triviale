import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const PrivateRoutes = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return (
    <>
      <NavBar hasBottomBorder />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
