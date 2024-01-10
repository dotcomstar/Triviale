import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import useDialogStore from "../../stores/dialogStore";

const PrivateRoutes = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const closeAllDialogs = useDialogStore((s) => s.closeAllDialogs);
  closeAllDialogs();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar hasBottomBorder />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
