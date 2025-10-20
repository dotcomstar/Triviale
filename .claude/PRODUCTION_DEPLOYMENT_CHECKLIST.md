# Production Deployment Checklist - Discord Activity

**Version:** 1.0
**Last Updated:** 2025-10-20
**Target:** Discord Activity Production Release

---

## Pre-Deployment Checks

### 1. Environment Variables ✅

Verify all environment variables are set in production:

**Vercel Dashboard → Project Settings → Environment Variables:**
- [ ] `DISCORD_CLIENT_ID` - Discord application client ID
- [ ] `DISCORD_CLIENT_SECRET` - Discord application client secret (secure)
- [ ] `VITE_DISCORD_CLIENT_ID` - Client ID for frontend (must match DISCORD_CLIENT_ID)
- [ ] `VITE_APP_URL` - Production URL (e.g., `https://triviale.vercel.app`)

**Optional (if MongoDB re-enabled):**
- [ ] `VITE_MONGODB_API_URL` - MongoDB API endpoint

### 2. Discord Developer Portal Configuration ⚙️

**Application Settings:**
- [ ] Application created at https://discord.com/developers/applications
- [ ] Application name set to "Triviale" (or your preference)
- [ ] Application icon uploaded
- [ ] Application description updated

**OAuth2 Settings:**
- [ ] Redirect URIs configured:
  - [ ] `https://your-production-domain.vercel.app`
- [ ] Scopes enabled:
  - [ ] `identify` - Get user info
  - [ ] `guilds` - Guild context (optional)

**Activities Tab:**
- [ ] Activity created
- [ ] Activity Name: "Triviale"
- [ ] Activity Description: "Daily trivia puzzle game"
- [ ] Activity URL Prefix: `https://your-production-domain.vercel.app`
- [ ] Activity Category: Games
- [ ] Activity enabled for production

**URL Mappings (if using external APIs):**
- [ ] MongoDB API mapped (if needed):
  - External: `https://us-west-2.aws.data.mongodb-api.com`
  - Proxy: `/api/mongodb`

### 3. Code Quality & Testing 🧪

**Build & Compilation:**
- [x] `npm run build` succeeds without errors
- [x] No TypeScript errors
- [x] No ESLint errors (run `npm run lint`)

**Console Logging:**
- [x] Debug logs wrapped in `logger.debug()` (only shown in dev mode)
- [x] No sensitive data logged
- [x] Error logging uses `logger.error()` (shown in production)

**Commented Code:**
- [x] Unused commented code removed or documented
- [x] No debug/testing code left active

**Bundle Size:**
- [x] Production build optimized
- [x] Gzipped total size: ~215 KB (acceptable for Discord Activity)
- [x] Main bundle: 63.55 KB gzipped
- [x] Discord SDK: 142.84 KB gzipped
- [x] MUI: 232.48 KB gzipped

### 4. Functionality Testing 🎮

**Core Game Features:**
- [ ] Questions load correctly
- [ ] Daily question selection works (based on date)
- [ ] Guess submission works
- [ ] Answer validation works (including alt answers)
- [ ] Win/lose states trigger correctly
- [ ] Progress to next question works
- [ ] Game completion works

**State Persistence:**
- [ ] Game state saves to localStorage
- [ ] Game state loads on page refresh
- [ ] Stats persist correctly
- [ ] Stats survive page refresh
- [ ] Stats survive Discord app restart

**Authentication:**
- [ ] Login button appears when not authenticated
- [ ] Discord OAuth flow completes successfully
- [ ] User profile loads after login
- [ ] Logout works correctly
- [ ] Auth state persists across page refresh

**UI/UX:**
- [ ] Game grid renders correctly
- [ ] On-screen keyboard works
- [ ] Physical keyboard shortcuts work
- [ ] Question text expands properly
- [ ] Progress bar updates correctly
- [ ] Dialogs (Help, Stats, Settings) open and close

### 5. Platform Testing 📱

**Discord Desktop App:**
- [ ] Windows - Game loads and plays correctly
- [ ] macOS - Game loads and plays correctly
- [ ] Linux - Game loads and plays correctly (if applicable)

**Discord Mobile App:**
- [ ] iOS - Touch interactions work
- [ ] iOS - Viewport displays correctly
- [ ] Android - Touch interactions work
- [ ] Android - Viewport displays correctly

**Discord Web:**
- [ ] Chrome - Game loads and plays
- [ ] Firefox - Game loads and plays
- [ ] Safari - Game loads and plays
- [ ] Edge - Game loads and plays

**Viewport Responsiveness:**
- [ ] Desktop (1920x1080+) - UI scales properly
- [ ] Tablet (768x1024) - UI scales properly
- [ ] Mobile (375x667) - UI scales properly
- [ ] Discord Activity iframe (~600-800px) - UI fits well

### 6. Accessibility Features ♿

**Settings & Modes:**
- [ ] Hard mode toggle works
- [ ] High contrast mode works
- [ ] Dark/light theme toggle works
- [ ] On-screen keyboard only mode works

**Keyboard Navigation:**
- [ ] Tab navigation works
- [ ] Enter key submits guess
- [ ] Backspace/Delete removes letters
- [ ] Letter keys add to guess

### 7. Error Handling & Edge Cases 🚨

**Network Issues:**
- [ ] Handles offline state gracefully
- [ ] Fallback to local questions works
- [ ] API errors don't crash app

**localStorage Issues:**
- [ ] App works if localStorage is blocked
- [ ] Error messages shown if storage fails
- [ ] Game still playable without persistence

**Discord SDK Issues:**
- [ ] App falls back to standalone mode if SDK fails
- [ ] No crashes if Discord SDK unavailable
- [ ] Standalone mode works for testing

**Date/Time Edge Cases:**
- [ ] Daily index calculation works across timezones
- [ ] Question selection works on day boundaries
- [ ] MANUAL_OFFSET (-9) correctly calibrates dates

### 8. Performance 🚀

**Load Times:**
- [ ] Initial page load < 3 seconds
- [ ] Time to interactive < 4 seconds
- [ ] No janky animations
- [ ] Smooth keyboard interactions

**Console Errors:**
- [ ] No errors in production console
- [ ] No warnings in production console
- [ ] No CSP violations
- [ ] No failed network requests

### 9. Security & Privacy 🔒

**Authentication:**
- [ ] OAuth2 flow uses HTTPS only
- [ ] Client secret stored securely (server-side only)
- [ ] Access tokens not exposed in frontend code
- [ ] Auth state cleared on logout

**Data Storage:**
- [ ] No sensitive user data in localStorage
- [ ] No API keys in frontend code
- [ ] Environment variables properly configured

**CSP Compliance:**
- [ ] All network requests use `/.proxy` prefix in Discord
- [ ] External APIs properly mapped in Discord portal
- [ ] No CSP violations in console

### 10. Analytics & Monitoring 📊

**Vercel Analytics:**
- [x] `@vercel/analytics` installed and configured
- [ ] Analytics working in production
- [ ] Page views tracked
- [ ] User interactions tracked (optional)

**Error Tracking (Optional):**
- [ ] Sentry or similar error tracking configured
- [ ] Source maps uploaded for debugging
- [ ] Error notifications set up

---

## Deployment Process

### Step 1: Final Code Review
```bash
# Ensure you're on the correct branch
git branch

# Review uncommitted changes
git status

# Review recent commits
git log -5 --oneline
```

### Step 2: Build & Test Locally
```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Build production bundle
npm run build

# Preview production build
npm run preview
```

### Step 3: Commit & Push
```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Discord Activity production release

- Optimized debug logging for production
- Cleaned up commented code
- Verified all features working
- Ready for production deployment"

# Push to remote
git push origin jaxonlee/discord_app
```

### Step 4: Merge to Main (or Deploy Branch)
```bash
# Option A: Create PR and merge via GitHub UI
# Option B: Merge locally
git checkout main
git merge jaxonlee/discord_app
git push origin main
```

### Step 5: Vercel Deployment
- [ ] Vercel automatically deploys `main` branch
- [ ] Check deployment status at https://vercel.com/dashboard
- [ ] Verify deployment succeeded (green checkmark)
- [ ] Visit production URL and test

### Step 6: Discord Activity Setup
- [ ] Update Activity URL in Discord Developer Portal
- [ ] Test Activity in Discord (use Developer Mode)
- [ ] Invite to test server
- [ ] Run through full game flow in Discord

### Step 7: Smoke Testing
Run quick smoke test in production:
- [ ] Load game in Discord Activity
- [ ] Login with Discord account
- [ ] Play one complete question
- [ ] Check stats dialog
- [ ] Verify localStorage persistence
- [ ] Check console for errors

---

## Post-Deployment Verification

### Immediate Checks (First 5 Minutes)
- [ ] Production site loads
- [ ] Discord Activity launches
- [ ] No console errors
- [ ] Authentication works
- [ ] Game is playable

### Short-Term Checks (First Hour)
- [ ] Monitor error rates in analytics
- [ ] Check user reports/feedback
- [ ] Verify stats persistence
- [ ] Test on multiple platforms

### Long-Term Monitoring (First Day)
- [ ] Daily question updates correctly
- [ ] No memory leaks
- [ ] No performance degradation
- [ ] User engagement metrics look good

---

## Rollback Plan

If critical issues are found in production:

### Quick Rollback (Vercel)
1. Go to Vercel Dashboard → Deployments
2. Find last known good deployment
3. Click "..." → "Promote to Production"
4. Production rolls back immediately

### Code Rollback (Git)
```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push (use with caution!)
git push --force origin main
```

---

## Common Issues & Solutions

### Issue: Discord SDK fails to initialize
**Solution:** Check that `VITE_DISCORD_CLIENT_ID` matches Discord Developer Portal

### Issue: localStorage not working in Discord
**Solution:** Verify CSP compliance, ensure no third-party cookies blocked

### Issue: Questions don't load
**Solution:** Check daily index calculation, verify questions.ts has data

### Issue: Authentication fails
**Solution:** Verify OAuth2 redirect URIs match production URL exactly

### Issue: CSS/Styles broken
**Solution:** Clear browser cache, check MUI theme provider wraps app

---

## Success Criteria ✨

Deployment is successful when:
- [x] Build completes without errors
- [ ] Game loads in Discord Activity
- [ ] Users can login with Discord
- [ ] Full game flow works (guess → win/lose → stats)
- [ ] State persists across sessions
- [ ] No critical errors in console
- [ ] Performance is smooth
- [ ] All platforms tested (desktop, mobile, web)

---

## Support & Resources

**Discord Developer Docs:**
- https://discord.com/developers/docs/activities/overview
- https://discord.com/developers/docs/activities/how-activities-work

**Vercel Docs:**
- https://vercel.com/docs
- https://vercel.com/docs/environment-variables

**Project Docs:**
- [CLAUDE.md](../CLAUDE.md) - Project overview
- [discord-activity-conversion.md](.claude/plans/discord-activity-conversion.md) - Implementation plan
- [BRANCH_ARCHITECTURE.md](BRANCH_ARCHITECTURE.md) - Architecture details

**Contact:**
- GitHub Issues: https://github.com/[your-repo]/issues
- Discord: [Your Discord Server]

---

**Deployment Date:** _________________
**Deployed By:** _________________
**Production URL:** _________________
**Discord Activity ID:** _________________

---

## Checklist Summary

- [ ] Environment variables configured
- [ ] Discord Developer Portal set up
- [ ] Code quality verified
- [ ] All features tested
- [ ] Platform testing complete
- [ ] Accessibility verified
- [ ] Error handling tested
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Deployment successful
- [ ] Post-deployment verification complete

**Status:** ⏳ Ready for deployment when all items checked
