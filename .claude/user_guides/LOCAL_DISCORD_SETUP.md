# Local Discord Activity Development Setup

Complete guide for running Triviale locally and testing it in Discord using Cloudflare tunnels.

---

## Prerequisites

Before starting, make sure you have:
- Node.js and npm installed
- A Discord account
- Cloudflare tunnel (`cloudflared`) installed

---

## Step 1: Install Cloudflare Tunnel (5 minutes)

Cloudflare tunnel allows Discord to access your localhost by creating a secure tunnel to your local dev server.

### macOS Installation:
```bash
brew install cloudflared
```

### Windows Installation:
Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

### Linux Installation:
```bash
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### Verify Installation:
```bash
cloudflared --version
```

---

## Step 2: Set Up Environment Variables (5 minutes)

1. **Open your `.env.local` file** in the project root (it should already exist)

2. **Add your Discord credentials:**
   ```env
   # Discord Configuration
   VITE_DISCORD_CLIENT_ID=your_application_id_here
   DISCORD_CLIENT_ID=your_application_id_here
   DISCORD_CLIENT_SECRET=your_client_secret_here
   ```

3. **Get your Discord credentials from Discord Developer Portal:**
   - Go to https://discord.com/developers/applications
   - Select your application (or create one if needed)
   - Copy the **Application ID** → use for both `VITE_DISCORD_CLIENT_ID` and `DISCORD_CLIENT_ID`
   - Go to OAuth2 → Reset Secret → copy **Client Secret** → use for `DISCORD_CLIENT_SECRET`

---

## Step 3: Start Your Local Dev Server (2 minutes)

In your first terminal window:

```bash
npm install  # If you haven't already
npm run dev
```

This should start your Vite dev server at `http://localhost:5173`

**✅ Verify:** You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Step 4: Start Cloudflare Tunnel (2 minutes)

In a **second terminal window** (keep the first one running), run:

```bash
cloudflared tunnel --url http://localhost:5173
```

**✅ You should see output like:**
```
2025-10-12T10:30:45Z INF +--------------------------------------------------------------------------------------------+
2025-10-12T10:30:45Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
2025-10-12T10:30:45Z INF |  https://random-words-here.trycloudflare.com                                               |
2025-10-12T10:30:45Z INF +--------------------------------------------------------------------------------------------+
```

**📋 Copy the `https://random-words-here.trycloudflare.com` URL** - you'll need this in the next step!

**⚠️ Important:** This URL changes each time you restart the tunnel. You'll need to update it in Discord Developer Portal each time.

---

## Step 5: Configure Discord Developer Portal (10 minutes)

1. **Go to Discord Developer Portal:** https://discord.com/developers/applications

2. **Select your application** (or create a new one if needed)

3. **Go to "Activities" section** in the left sidebar
   - If you don't see "Activities", you may need to enable it first

4. **Configure Activity Settings:**
   - Click "Add Activity" or edit existing
   - **Activity Name:** Triviale
   - **Activity URL (Root Mapping):** Paste your Cloudflare tunnel URL
     - Example: `https://random-words-here.trycloudflare.com`
   - **Description:** Daily trivia puzzle game
   - **Category:** Games
   - Click **Save**

5. **Add URL Mappings** (for external API access):
   - Scroll down to "URL Mappings" section
   - Click "Add URL Mapping"
   - **Prefix:** `/api/mongodb`
   - **Target:** `https://us-west-2.aws.data.mongodb-api.com`
   - Click **Save**

6. **Configure OAuth2 Redirects:**
   - Go to "OAuth2" section in left sidebar
   - Under "Redirects", click "Add Redirect"
   - Add your Cloudflare tunnel URL: `https://random-words-here.trycloudflare.com`
   - Click **Save Changes**

---

## Step 6: Test in Discord (5 minutes)

### Option A: Test via Developer Portal
1. In Discord Developer Portal, go to your application's **Activities** page
2. Find the "Test Activity" or "Launch" button
3. Click it - Discord should open with your activity loaded

### Option B: Test via Discord Client
1. **Enable Developer Mode in Discord:**
   - Open Discord app
   - Go to User Settings (gear icon) → Advanced
   - Enable "Developer Mode"

2. **Access your activity:**
   - In Discord Developer Portal, copy your Activity URL
   - Use Discord's developer tools to launch the activity

3. **Verify everything works:**
   - ✅ App loads in Discord iframe
   - ✅ Questions display correctly
   - ✅ You can make guesses
   - ✅ Game mechanics work
   - ✅ No console errors

---

## Step 7: Check Browser Console (Important!)

1. **Open Discord in your browser** (easier for debugging than desktop app)
   - Go to https://discord.com/app
   - Launch your activity

2. **Open DevTools:**
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)

3. **Check Console tab for:**
   - ✅ `"✅ localStorage works in Discord environment"` - storage is working
   - ✅ No CSP violation errors
   - ✅ No network request failures
   - ❌ Any error messages (report these)

4. **Check Network tab:**
   - Look for any failed requests (red)
   - Verify API calls are using `/.proxy` prefix correctly

---

## Workflow Summary

Your typical development workflow:

### Terminal 1:
```bash
npm run dev
```
*Starts Vite dev server at localhost:5173*

### Terminal 2:
```bash
cloudflared tunnel --url http://localhost:5173
```
*Creates public tunnel - copy the URL it gives you*

### Browser:
1. Update Discord Developer Portal with new Cloudflare URL (if tunnel restarted)
2. Launch activity in Discord
3. Test your changes
4. Check console for errors

---

## Troubleshooting

### Issue: Cloudflare tunnel URL changed and Discord can't connect

**Solution:**
- Copy the new tunnel URL from your terminal
- Update it in Discord Developer Portal → Activities → Activity URL
- Click Save
- Refresh your Discord activity

### Issue: "Failed to load resource" or CSP errors

**Solution:**
- Verify URL mappings in Discord Portal are correct
- Check that requests use `/.proxy` prefix for external APIs
- Our code already handles this, but verify in Network tab

### Issue: Authentication not working

**Solution:**
- Verify `VITE_DISCORD_CLIENT_ID` in `.env.local` matches Application ID
- Verify `DISCORD_CLIENT_SECRET` is set correctly
- Check OAuth2 redirect URL includes your current Cloudflare tunnel URL
- Restart dev server after changing `.env.local`

### Issue: localStorage not persisting game state

**Solution:**
- Check console for localStorage test message
- Discord should allow localStorage in iframes
- If blocked, let me know and we'll implement a fallback

### Issue: "Cannot connect to Discord" error

**Solution:**
- Ensure both terminal windows are running (dev server + tunnel)
- Verify tunnel URL is correct in Discord Portal
- Try restarting the tunnel
- Check if Discord Developer Mode is enabled

### Issue: Changes not showing up

**Solution:**
- Vite should hot-reload automatically
- If not, hard refresh in Discord: `Ctrl+Shift+R` / `Cmd+Shift+R`
- Check that dev server detected the file change (see Terminal 1)
- Try stopping and restarting `npm run dev`

---

## Tips for Efficient Development

1. **Keep both terminals visible** - watch for errors in both

2. **Use browser Discord for debugging** - easier to access DevTools

3. **Bookmark your Discord Activity** - in Developer Portal for quick testing

4. **Use a stable tunnel URL** (optional):
   - You can set up a named Cloudflare tunnel for a consistent URL
   - See: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/

5. **Hot reload works!** - Vite will reload changes automatically in Discord

6. **Check console frequently** - catch errors early

---

## What's Different from Regular Web Development?

### CSP (Content Security Policy)
- Discord enforces strict CSP
- External URLs need URL mappings configured
- Our code automatically adds `/.proxy` prefix when in Discord

### Authentication
- Uses Discord OAuth2 instead of Auth0
- User info comes from Discord SDK
- Token exchange happens via `/api/token` endpoint

### iframe Context
- App runs inside Discord's iframe
- Some browser APIs may behave differently
- localStorage should work (we test for this)

### URL Structure
- All requests route through Discord's proxy
- `/.proxy/api/token` → your Vercel function
- `/.proxy/api/mongodb/...` → MongoDB API (if configured)

---

## Ready for Production?

Once local testing is complete:

1. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Discord Activity integration complete"
   git push
   ```

2. **Update Discord Portal with production URL:**
   - Change Activity URL from Cloudflare tunnel to Vercel URL
   - Update OAuth2 redirect to Vercel URL

3. **Test in production Discord environment**

4. **Submit for Discord review** (when ready to publish)

---

## Environment Summary

### Local Development:
- **Dev Server:** `http://localhost:5173`
- **Public URL:** `https://random-words.trycloudflare.com` (changes each session)
- **Discord Portal:** Points to Cloudflare URL
- **Environment:** `.env.local`

### Production:
- **Production URL:** `https://your-app.vercel.app`
- **Discord Portal:** Points to Vercel URL
- **Environment:** Vercel environment variables

---

## Quick Reference Commands

```bash
# Start development
npm run dev                                      # Terminal 1
cloudflared tunnel --url http://localhost:5173   # Terminal 2

# Build for production
npm run build

# Check for TypeScript errors
npm run lint

# Install dependencies (first time)
npm install

# Install cloudflared (macOS)
brew install cloudflared
```

---

## Next Steps

After successfully testing locally:

1. ✅ Verify localStorage persistence (close/reopen activity)
2. ✅ Test stats tracking
3. ✅ Verify daily question logic
4. ✅ Test on mobile Discord
5. ✅ Deploy to production (Vercel)
6. ✅ Test production environment
7. ✅ Polish UI/UX for Discord
8. ✅ Submit for Discord review

---

**Last Updated:** 2025-10-12
**Status:** Ready to use for local development
**Phase:** 3 - Testing & Validation

For issues or questions, check the main plan: `.claude/plans/discord-activity-conversion.md`
