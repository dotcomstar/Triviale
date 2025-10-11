import { DiscordSDK } from '@discord/embedded-app-sdk';

declare global {
  interface Window {
    discordSdk?: DiscordSDK;
  }
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string | null;
  global_name?: string | null;
  public_flags?: number;
}

export interface DiscordAuth {
  access_token: string;
  user: DiscordUser;
  scopes: string[];
  expires: string;
  application: {
    id: string;
    description: string;
    name: string;
    icon?: string | null;
  };
}

export interface DiscordChannel {
  id: string;
  type: number;
  guild_id?: string;
  name?: string;
}

export interface DiscordGuild {
  id: string;
  name: string;
}
