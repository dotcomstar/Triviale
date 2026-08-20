import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import useDialogStore from "../../stores/dialogStore";

const ProtectedElements = () => {
  // Deliberately called here in the render body, not an effect -- see
  // ErrorPage.tsx and the 08-14 code review doc's Revisions section. Same
  // NavBar/LandingDialog(open by default)-flash issue applies here.
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
