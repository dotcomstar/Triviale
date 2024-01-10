import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import UserProfilePage from "./pages/UserProfilePage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoutes from "./components/auth/AuthRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // Default component
      {
        element: <AuthRoutes />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
            children: [{ path: "callback" }],
          },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "profile",
            element: <UserProfilePage />,
            // children: [{ path: ":username", element: <UserDetail /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
