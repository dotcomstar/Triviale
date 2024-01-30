import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import useDialogStore from "../../stores/dialogStore";

const ProtectedElements = () => {
  const closeAllDialogs = useDialogStore((s) => s.closeAllDialogs);
  closeAllDialogs();

  return (
    <>
      <NavBar hasBottomBorder />
      <Outlet />
    </>
  );
};

const PrivateRoutes = withAuthenticationRequired(ProtectedElements);

export default PrivateRoutes;
