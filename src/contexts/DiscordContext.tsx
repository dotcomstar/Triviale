import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import type { DiscordAuth, DiscordUser } from '../types/discord';
import { logger } from '../utils/logger';

interface DiscordContextType {
  sdk: DiscordSDK | null;
  auth: DiscordAuth | null;
  user: DiscordUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
}

const DiscordContext = createContext<DiscordContextType | null>(null);

export const useDiscord = () => {
  const context = useContext(DiscordContext);
  if (!context) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return context;
};

interface DiscordProviderProps {
  children: ReactNode;
}

export const DiscordProvider = ({ children }: DiscordProviderProps) => {
  const [sdk, setSdk] = useState<DiscordSDK | null>(null);
  const [auth, setAuth] = useState<DiscordAuth | null>(null);
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDiscord = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;

        if (!clientId || clientId === 'placeholder_discord_client_id') {
          logger.info('Discord Client ID not configured - running in standalone mode');
          setIsLoading(false);
          return;
        }

        // Initialize Discord SDK - it will detect if we're in Discord environment
        logger.info('Initializing Discord SDK...');
        const discordSdk = new DiscordSDK(clientId);

        // ready() will timeout/fail if not in Discord environment
        await discordSdk.ready();

        setSdk(discordSdk);
        window.discordSdk = discordSdk;

        logger.info('✅ Discord SDK initialized successfully');
        logger.debug('Discord environment detected:', {
          channelId: discordSdk.channelId,
          guildId: discordSdk.guildId,
          instanceId: discordSdk.instanceId,
        });

        // Try to authenticate automatically if we have stored auth
        const storedAuth = localStorage.getItem('discord_auth');
        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            setAuth(parsedAuth);
            setUser(parsedAuth.user);
          } catch (e) {
            logger.error('Failed to parse stored auth:', e);
            localStorage.removeItem('discord_auth');
          }
        }

        setIsLoading(false);
      } catch (err) {
        // If Discord SDK fails to initialize, we're likely not in Discord
        logger.info('Not running in Discord environment - Discord SDK disabled');
        logger.debug('Error:', err instanceof Error ? err.message : 'Unknown error');
        setError(null); // Don't treat this as an error, just disable Discord features
        setIsLoading(false);
      }
    };

    initDiscord();
  }, []);

  const login = async () => {
    if (!sdk) {
      setError('Discord SDK not initialized');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;

      // Step 1: Authorize
      logger.info('Starting Discord OAuth flow...');
      const { code } = await sdk.commands.authorize({
        client_id: clientId,
        response_type: 'code',
        state: '',
        prompt: 'none',
        scope: [
          'identify',
          'guilds',
        ],
      });

      logger.debug('Authorization code received, exchanging for token...');

      // Step 2: Exchange code for access token via backend
      const response = await fetch('/.proxy/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
      }

      const { access_token } = await response.json();

      logger.debug('Access token received, authenticating...');

      // Step 3: Authenticate with Discord
      const authResult = await sdk.commands.authenticate({
        access_token,
      });

      logger.info('Authentication successful!', authResult.user.username);

      const discordAuth: DiscordAuth = {
        access_token,
        user: authResult.user as DiscordUser,
        scopes: authResult.scopes.map(String),
        expires: authResult.expires,
        application: authResult.application,
      };

      setAuth(discordAuth);
      setUser(authResult.user as DiscordUser);

      // Store auth for next session
      localStorage.setItem('discord_auth', JSON.stringify(discordAuth));

      setIsLoading(false);
    } catch (err) {
      logger.error('Login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem('discord_auth');
    logger.info('Logged out successfully');
  };

  const value: DiscordContextType = {
    sdk,
    auth,
    user,
    isAuthenticated: !!auth,
    isLoading,
    error,
    login,
    logout,
  };

  return (
    <DiscordContext.Provider value={value}>
      {children}
    </DiscordContext.Provider>
  );
};
