import { Outlet, useNavigate } from "react-router-dom";
import ThemedLayout from "../components/ThemedLayout";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface Props extends Auth0ProviderOptions {
  children: ReactNode;
}

// In order to return to protected routes, the Auth0 Provider needs to be rendered
// within the routing context as per https://stackoverflow.com/questions/73934043/how-to-use-auth0-provider-with-the-new-createbrowsererouter-in-v6-4
const Auth0ProviderWithRedirectCallback = ({ children, ...props }: Props) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

const Layout = () => {
  return (
    <Auth0ProviderWithRedirectCallback
      domain="triviale.us.auth0.com"
      clientId="uHV7AShHn22WhqjYNvzI1eMFyr1i2Fzr"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemedLayout>
        <Outlet />
      </ThemedLayout>
    </Auth0ProviderWithRedirectCallback>
  );
};

export default Layout;
