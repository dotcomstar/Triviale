# Discord Activity Setup Instructions

## Current Status

✅ **Phase 1 Complete:** Discord SDK integrated, Auth0 removed, code builds successfully
⏳ **Phase 2 In Progress:** CSP compliance implemented, awaiting Discord Portal configuration
📋 **Next Steps:** Set up Discord Developer Portal and test in Discord environment

---

## What You Need To Do Next

### Step 1: Create Discord Application (15 minutes)

1. **Go to Discord Developer Portal**
   - Visit: https://discord.com/developers/applications
   - Click "New Application"
   - Name: "Triviale" (or your preferred name)
   - Accept Terms and click "Create"

2. **Save Your Credentials**
   - Copy your **Application ID** (this is your Client ID)
   - Go to "OAuth2" section in left sidebar
   - Click "Reset Secret" and copy your **Client Secret**
   - **IMPORTANT:** Save these securely - you'll need them in Step 2

### Step 2: Configure Environment Variables (5 minutes)

1. **Update `.env.local` file** (already exists in your project):
   ```env
   # Discord Configuration
   VITE_DISCORD_CLIENT_ID=your_application_id_here
   DISCORD_CLIENT_ID=your_application_id_here
   DISCORD_CLIENT_SECRET=your_client_secret_here
   ```

2. **Replace placeholders** with the credentials from Step 1

3. **Restart dev server** if running:
   ```bash
   npm run dev
   ```

### Step 3: Configure Discord Activity (10 minutes)

1. **In Discord Developer Portal, go to "Activities" tab**

2. **Create/Configure Activity:**
   - Click "New Activity" or configure existing
   - **Activity Name:** Triviale
   - **Description:** Daily trivia puzzle game - try to answer questions before they're fully revealed
   - **Activity Category:** Games
   - **Activity URL (Development):** `http://localhost:5173` (for local testing)
   - **Activity URL (Production):** `https://your-vercel-domain.vercel.app` (once deployed)

3. **Add URL Mappings** (for MongoDB API access):
   - In Activities section, find "URL Mappings"
   - Click "Add URL Mapping"
   - **External URL:** `https://us-west-2.aws.data.mongodb-api.com`
   - **Proxy Path:** `/api/mongodb`
   - Click "Save"

### Step 4: OAuth2 Configuration (5 minutes)

1. **Go to "OAuth2" section**

2. **Add Redirect URIs:**
   - For local dev: `http://localhost:5173`
   - For production: `https://your-vercel-domain.vercel.app`

3. **Verify Scopes** (should already be set in code):
   - `identify` - Get user info
   - `guilds` - Guild context (optional)

### Step 5: Test Locally (10 minutes)

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Enable Discord Developer Mode:**
   - Open Discord app
   - Go to User Settings → Advanced
   - Enable "Developer Mode"

3. **Test Activity:**
   - In Discord Developer Portal, find your application
   - In Activities section, click "Test Activity" or "Launch"
   - Your app should open in Discord's iframe
   - Check browser console for any errors

4. **What to look for:**
   - ✅ App loads without errors
   - ✅ Console shows: "✅ localStorage works in Discord environment"
   - ✅ Discord authentication prompts (if profile features used)
   - ❌ Any CSP violations (report these)
   - ❌ Network request failures (check URL mappings)

### Step 6: Deploy to Vercel (5 minutes)

1. **Add environment variables to Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the same three variables from `.env.local`:
     - `VITE_DISCORD_CLIENT_ID`
     - `DISCORD_CLIENT_ID`
     - `DISCORD_CLIENT_SECRET`

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Discord Activity integration"
   git push
   ```

3. **Update Discord Portal with production URL:**
   - Go back to Discord Developer Portal
   - Update Activity URL to your Vercel domain
   - Update OAuth2 redirect URI to your Vercel domain

### Step 7: Test in Production (10 minutes)

1. **Launch activity in Discord using production URL**

2. **Test all features:**
   - [ ] App loads in Discord iframe
   - [ ] Authentication works (if using profile)
   - [ ] Questions display correctly
   - [ ] Game mechanics work (guessing, scoring)
   - [ ] localStorage persists game state
   - [ ] Stats track correctly
   - [ ] Mobile Discord works
   - [ ] Desktop Discord works

3. **Check for issues:**
   - Monitor browser console for errors
   - Check Network tab for failed requests
   - Verify CSP compliance (no blocked requests)

---

## Troubleshooting

### Issue: "CSP Violation" errors in console

**Solution:**
- Verify URL mapping is configured correctly in Discord Portal
- External URL: `https://us-west-2.aws.data.mongodb-api.com`
- Proxy Path: `/api/mongodb`
- Ensure no typos in the mapping

### Issue: Authentication not working

**Solution:**
- Verify `VITE_DISCORD_CLIENT_ID` matches your Application ID
- Check OAuth2 redirect URIs are correct
- Ensure `DISCORD_CLIENT_SECRET` is set in Vercel environment
- Check `/api/token` endpoint is deployed (should be automatic with Vercel)

### Issue: localStorage not working

**Solution:**
- Check browser console - should show localStorage test result
- Discord usually allows localStorage in iframes
- If blocked, we'll need to implement Discord SDK storage fallback
- Report this issue and we'll implement a solution

### Issue: App doesn't load in Discord

**Solution:**
- Verify Activity URL is correct (http://localhost:5173 for dev)
- Check that dev server is running
- Try hard refresh in Discord (Ctrl+Shift+R or Cmd+Shift+R)
- Check Discord Developer Portal for any error messages

---

## What's Already Done ✅

- [x] Discord SDK installed and integrated
- [x] Auth0 completely removed
- [x] Discord authentication context created
- [x] All auth components updated for Discord
- [x] Token exchange endpoint created (`/api/token`)
- [x] CSP-compliant URL routing implemented
- [x] localStorage compatibility test added
- [x] Build succeeds with no errors
- [x] Environment variable templates created

---

## What's Pending ⏳

- [ ] Discord Developer Portal application setup (YOU)
- [ ] Environment variables configured (YOU)
- [ ] URL mappings configured in Portal (YOU)
- [ ] Testing in Discord environment (YOU + CLAUDE)
- [ ] Deployment to staging/production (YOU)

---

## Need Help?

If you encounter any issues during setup:

1. **Check the console** - Most issues show error messages
2. **Verify environment variables** - Common source of problems
3. **Check URL mappings** - CSP issues usually come from here
4. **Review Discord docs** - https://discord.com/developers/docs/activities/overview

Once you complete Steps 1-5, we can continue with testing and any fixes needed!

---

**Last Updated:** 2025-10-11
**Build Status:** ✅ Passing
**Phase:** 2 - CSP & Network (50% complete)
