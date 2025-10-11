import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    const clientId = process.env.VITE_DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing Discord credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Exchange authorization code for access token
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord token exchange failed:', response.status, errorText);
      return res.status(response.status).json({
        error: 'Token exchange failed',
        details: errorText,
      });
    }

    const data = await response.json();

    // Return the access token to the client
    return res.status(200).json({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      scope: data.scope,
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
