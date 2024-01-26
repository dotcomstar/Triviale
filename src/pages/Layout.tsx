import { Outlet } from "react-router-dom";
import ThemedLayout from "../components/ThemedLayout";

const Layout = () => {
  return (
    <ThemedLayout>
      <Outlet />
    </ThemedLayout>
  );
};

export default Layout;
