import axios from "axios";

/**
 * Determines if the app is running inside a Discord Activity iframe
 */
const isDiscordEnvironment = (): boolean => {
  try {
    // Check if running in iframe with Discord as parent
    return (
      window.self !== window.top &&
      (window.location.ancestorOrigins?.[0]?.includes('discord.com') ||
        // Fallback check for environments where ancestorOrigins isn't available
        document.referrer.includes('discord.com'))
    );
  } catch {
    return false;
  }
};

/**
 * Gets the appropriate base URL for API requests based on environment
 * In Discord Activities, external URLs must be proxied through /.proxy prefix
 * and configured via URL mappings in Discord Developer Portal
 */
const getBaseURL = (): string => {
  const mongodbUrl = "https://us-west-2.aws.data.mongodb-api.com/app/data-xenan/endpoint";

  if (isDiscordEnvironment()) {
    // In Discord, use proxy path that maps to external MongoDB URL
    // This must be configured in Discord Developer Portal under URL Mappings:
    // External URL: https://us-west-2.aws.data.mongodb-api.com
    // Proxy Path: /api/mongodb
    return "/.proxy/api/mongodb/app/data-xenan/endpoint";
  }

  return mongodbUrl;
};

export default axios.create({
  baseURL: getBaseURL(),
});
