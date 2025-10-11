import { Outlet } from "react-router-dom";
import ThemedLayout from "../components/ThemedLayout";
import { DiscordProvider } from "../contexts/DiscordContext";

const Layout = () => {
  return (
    <DiscordProvider>
      <ThemedLayout>
        <Outlet />
      </ThemedLayout>
    </DiscordProvider>
  );
};

export default Layout;
