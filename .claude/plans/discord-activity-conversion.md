# Discord Activity Conversion Plan for Triviale

**Status:** Planning Phase
**Last Updated:** 2025-10-11
**Estimated Timeline:** 2-7 days (depending on multiplayer scope)

---

## Executive Summary

Converting Triviale to a Discord Activity is **highly feasible** with your existing React/Vite/TypeScript architecture. The core game logic, UI components, and state management can remain largely unchanged. Main work involves:

1. Replacing Auth0 with Discord OAuth2
2. Adding Discord Embedded App SDK
3. Handling Content Security Policy (CSP) restrictions
4. Optionally adding multiplayer features

---

## Table of Contents

1. [Current Architecture Analysis](#current-architecture-analysis)
2. [Discord Activity Requirements](#discord-activity-requirements)
3. [Required Changes](#required-changes)
4. [Implementation Phases](#implementation-phases)
5. [Multiplayer Options](#multiplayer-options)
6. [Technical Specifications](#technical-specifications)
7. [Risk Assessment](#risk-assessment)
8. [Resources & References](#resources--references)

---

## Current Architecture Analysis

### What Works As-Is ✅

- **React + Vite** - Fully compatible with Discord Activities
- **TypeScript** - No changes needed
- **Zustand State Management** - Works perfectly in iframe
- **Material-UI Components** - Compatible with Discord's environment
- **Game Logic** - All game mechanics in [HomePage.tsx](../src/pages/HomePage.tsx) work unchanged
- **Question System** - [questions.ts](../src/data/questions.ts) and daily index logic compatible
- **Grid/Keyboard Components** - All UI components work as-is
- **Vercel Hosting** - Already meets HTTPS requirement

### What Needs Modification ⚠️

- **Authentication** - Must replace Auth0 with Discord OAuth2
  - Remove: `@auth0/auth0-react`
  - Add: `@discord/embedded-app-sdk`
  - Files: [Layout.tsx](../src/pages/Layout.tsx), auth components

- **Network Requests** - Must comply with Discord CSP
  - Files: [api-client.ts](../src/services/api-client.ts)
  - MongoDB endpoint needs URL mapping configuration

- **Storage** - localStorage may have iframe restrictions
  - Test current localStorage usage
  - May need Discord SDK storage APIs

### Files That Won't Change 🔒

- `src/pages/HomePage.tsx` - Core game logic
- `src/components/grid/*` - GameGrid, GameRow, Cell
- `src/components/keyboard/*` - Keyboard components
- `src/components/question/*` - Question display
- `src/data/questions.ts` - Question data
- `src/hooks/useDailyIndex.ts` - Date-based question selection
- `src/stores/gameStateStore.ts` - Game state (unless adding multiplayer)
- `src/stores/statsStore.ts` - Statistics tracking
- All other Zustand stores

---

## Discord Activity Requirements

### 1. Discord Embedded App SDK

**Package:** `@discord/embedded-app-sdk`
**Latest Version:** 2.4.0 (as of Oct 2025)

**Installation:**
```bash
npm install @discord/embedded-app-sdk
```

**Core Functionality:**
- OAuth2 authentication flow
- User identity and participant information
- Channel/guild context
- Communication with Discord client
- RPC commands for Discord integration

### 2. Authentication Flow

Discord uses OAuth2 with the following flow:

```typescript
// 1. Authorize (request scopes)
const { code } = await discordSdk.commands.authorize({
  client_id: YOUR_CLIENT_ID,
  response_type: "code",
  state: "",
  prompt: "none",
  scope: ["identify", "guilds"],
});

// 2. Exchange code for token (your backend)
const response = await fetch('/.proxy/api/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code }),
});
const { access_token } = await response.json();

// 3. Authenticate with Discord
const auth = await discordSdk.commands.authenticate({
  access_token,
});
```

### 3. Content Security Policy (CSP)

Discord enforces strict CSP that affects network requests:

**Problem:**
- External URLs like `https://example.com/api` are blocked
- Relative URLs like `/api/token` are blocked

**Solutions:**
1. **Prefix relative URLs with `/.proxy`**
   - `/api/token` → `/.proxy/api/token`

2. **Configure URL Mapping in Discord Developer Portal**
   - Map external domains (e.g., MongoDB API)
   - Format: `External URL → Your proxy endpoint`

3. **Use Proxy Server (if needed)**
   - Create backend proxy for external APIs
   - Introduces latency but bypasses CSP

### 4. Hosting Requirements

- ✅ **HTTPS Required** - Your Vercel hosting works
- ✅ **Modern Browser Support** - Your React app compatible
- ✅ **Mobile Responsive** - Already implemented at 600px breakpoint
- ⚠️ **iframe Compatibility** - Test localStorage and other browser APIs

---

## Required Changes

### Phase 1: Core Discord Integration (Priority 1)

#### 1.1 Package Changes

**Remove:**
```bash
npm uninstall @auth0/auth0-react
```

**Add:**
```bash
npm install @discord/embedded-app-sdk
```

**Update [package.json](../package.json):**
- Remove `@auth0/auth0-react` line
- Add `@discord/embedded-app-sdk` to dependencies

#### 1.2 Initialize Discord SDK

**File: [src/main.tsx](../src/main.tsx)**

Add Discord SDK initialization:

```typescript
import { DiscordSDK } from '@discord/embedded-app-sdk';

// Initialize Discord SDK
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

// Wait for SDK to be ready
await discordSdk.ready();

// Make SDK available globally or via context
window.discordSdk = discordSdk;

// Then render your app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

#### 1.3 Create Discord Auth Context

**New File: `src/contexts/DiscordContext.tsx`**

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { DiscordSDK } from '@discord/embedded-app-sdk';

interface DiscordContextType {
  sdk: DiscordSDK | null;
  auth: any | null;
  user: any | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const DiscordContext = createContext<DiscordContextType>(null!);

export const useDiscord = () => useContext(DiscordContext);

export const DiscordProvider = ({ children }: { children: React.ReactNode }) => {
  const [sdk, setSdk] = useState<DiscordSDK | null>(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize SDK
    const initDiscord = async () => {
      const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
      await discordSdk.ready();
      setSdk(discordSdk);
    };
    initDiscord();
  }, []);

  const login = async () => {
    if (!sdk) return;

    // OAuth flow
    const { code } = await sdk.commands.authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify", "guilds"],
    });

    // Exchange code for token via your backend
    const response = await fetch('/.proxy/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const { access_token } = await response.json();

    // Authenticate
    const authResult = await sdk.commands.authenticate({ access_token });
    setAuth(authResult);
    setUser(authResult.user);
  };

  const logout = () => {
    setAuth(null);
    setUser(null);
  };

  return (
    <DiscordContext.Provider
      value={{
        sdk,
        auth,
        user,
        isAuthenticated: !!auth,
        login,
        logout
      }}
    >
      {children}
    </DiscordContext.Provider>
  );
};
```

#### 1.4 Replace Auth0 in Layout

**File: [src/pages/Layout.tsx](../src/pages/Layout.tsx)**

Replace entire Auth0Provider with DiscordProvider:

```typescript
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
```

#### 1.5 Update Auth Components

**Files to update:**
- `src/components/auth/LoginButton.tsx` - Use `useDiscord()` instead of `useAuth0()`
- `src/components/auth/LogoutButton.tsx` - Use `useDiscord()` instead of `useAuth0()`
- `src/components/auth/ProfileButton.tsx` - Use `useDiscord()` for user info
- `src/components/auth/PrivateRoutes.tsx` - Check `isAuthenticated` from Discord

**Example - LoginButton.tsx:**
```typescript
import { useDiscord } from "../../contexts/DiscordContext";

const LoginButton = () => {
  const { login, isAuthenticated } = useDiscord();

  if (isAuthenticated) return null;

  return <Button onClick={login}>Login with Discord</Button>;
};
```

### Phase 2: CSP Compliance (Priority 2)

#### 2.1 Update API Client

**File: [src/services/api-client.ts](../src/services/api-client.ts)**

Add CSP-compliant URL handling:

```typescript
// Add proxy prefix for CSP compliance
const getProxiedUrl = (url: string) => {
  // If running in Discord Activity iframe
  if (window.location.ancestorOrigins?.[0]?.includes('discord.com')) {
    // External URLs need mapping configured in Discord Portal
    // Relative URLs need /.proxy prefix
    if (url.startsWith('/')) {
      return `/.proxy${url}`;
    }
  }
  return url;
};

// Update your axios instance
const apiClient = axios.create({
  baseURL: getProxiedUrl(BASE_URL),
  // ... rest of config
});
```

#### 2.2 Configure Discord URL Mapping

**In Discord Developer Portal:**

1. Go to your application
2. Navigate to "Activities" section
3. Add URL Mappings:
   - External URL: `https://us-west-2.aws.data.mongodb-api.com`
   - Proxy path: `/api/mongodb`

4. Update your code to use proxy path:
```typescript
const MONGODB_BASE = window.location.ancestorOrigins?.[0]?.includes('discord.com')
  ? '/.proxy/api/mongodb'
  : 'https://us-west-2.aws.data.mongodb-api.com';
```

#### 2.3 Test Network Requests

Create a test utility to verify all network calls:

```typescript
// src/utils/testNetwork.ts
export const testDiscordNetwork = async () => {
  const tests = [
    { name: 'MongoDB API', url: '/.proxy/api/mongodb/endpoint' },
    { name: 'Token Exchange', url: '/.proxy/api/token' },
  ];

  for (const test of tests) {
    try {
      await fetch(test.url);
      console.log(`✅ ${test.name} works`);
    } catch (error) {
      console.error(`❌ ${test.name} failed:`, error);
    }
  }
};
```

### Phase 3: Backend Token Exchange (Priority 2)

You'll need a backend endpoint to exchange OAuth codes for tokens.

**Option 1: Vercel Serverless Function**

**New File: `api/token.ts`**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  try {
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Token exchange failed' });
  }
}
```

**Add to `.env.local`:**
```
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
VITE_DISCORD_CLIENT_ID=your_client_id
```

### Phase 4: Storage & State (Priority 3)

#### 4.1 Test localStorage Compatibility

Current localStorage usage in [HomePage.tsx](../src/pages/HomePage.tsx):
- Line 96-117: Save game state
- Line 120-140: Load previous stats
- Line 143-169: Load previous game

**Test in Discord iframe:**
```typescript
// Add to HomePage useEffect
useEffect(() => {
  try {
    localStorage.setItem('discord-test', 'works');
    const test = localStorage.getItem('discord-test');
    console.log('localStorage works:', test === 'works');
  } catch (error) {
    console.error('localStorage failed in Discord iframe:', error);
  }
}, []);
```

**If localStorage fails, use Discord SDK storage:**
```typescript
// Alternative storage using Discord SDK
const saveToDiscord = async (key: string, value: any) => {
  // Store in Discord's persistent storage
  // Implementation depends on Discord SDK capabilities
};
```

### Phase 5: UI/UX Adjustments (Priority 3)

#### 5.1 Test Discord Iframe Dimensions

Discord Activities typically display in a constrained iframe:
- Desktop: ~600-800px wide
- Mobile: Full width but constrained height

**Current mobile breakpoint:** `600px` in [settings.ts](../src/constants/settings.ts)

**Test and adjust:**
```typescript
// Add Discord-specific breakpoint if needed
export const DISCORD_ACTIVITY_WIDTH = "750px";
```

#### 5.2 Simplify Navigation

Discord Activities typically have minimal chrome:

**Consider:**
- Removing or simplifying [NavBar.tsx](../src/components/navbar/NavBar.tsx)
- Moving settings to a compact overlay
- Using Discord's native sharing instead of custom ShareButton

#### 5.3 Dark Mode Compatibility

Discord has dark/light themes. Test your existing MUI theme:
- [ThemedLayout.tsx](../src/components/ThemedLayout.tsx) already handles dark mode
- Ensure it respects Discord's theme preference

```typescript
// Detect Discord theme
const discordTheme = sdk?.getPlatform()?.theme || 'dark';
```

### Phase 6: Discord Developer Portal Setup (Priority 1)

#### 6.1 Create Discord Application

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Name: "Triviale" or similar
4. Save Application ID and Client Secret

#### 6.2 Configure Activity

1. In application settings, go to "Activities"
2. Click "New Activity" or configure existing
3. Set Activity details:
   - **Name:** Triviale
   - **Description:** Daily trivia puzzle game
   - **Activity URL:** `https://your-vercel-domain.vercel.app`
   - **Category:** Games

#### 6.3 OAuth2 Configuration

1. Go to "OAuth2" section
2. Add redirect URIs:
   - `https://your-vercel-domain.vercel.app`
3. Required scopes:
   - `identify` - Get user info
   - `guilds` - Optional, for guild context

#### 6.4 URL Mappings

Configure external API access:
1. In "Activities" → "URL Mappings"
2. Add mapping for MongoDB:
   - **External URL:** `https://us-west-2.aws.data.mongodb-api.com`
   - **Proxy Path:** `/api/mongodb`

#### 6.5 Enable Activity

1. Save all settings
2. Enable "Developer Mode" in Discord app (User Settings → Advanced)
3. Test Activity using Activity URL

---

## Implementation Phases

### Phase 1: Core Discord Integration (Days 1-2)

**Goals:**
- Discord SDK installed and initialized
- Basic authentication working
- App loads in Discord Activity iframe

**Tasks:**
- [ ] Install `@discord/embedded-app-sdk`
- [ ] Remove `@auth0/auth0-react`
- [ ] Create Discord Developer Portal application
- [ ] Initialize SDK in [main.tsx](../src/main.tsx)
- [ ] Create DiscordContext
- [ ] Replace Auth0 in [Layout.tsx](../src/pages/Layout.tsx)
- [ ] Update auth components (Login, Logout, Profile)
- [ ] Create backend token exchange endpoint
- [ ] Test authentication flow
- [ ] Deploy to staging

**Success Criteria:**
- App loads in Discord Activity test environment
- Users can authenticate with Discord
- User info displays correctly

### Phase 2: CSP & Network (Day 3)

**Goals:**
- All network requests work in Discord iframe
- Questions load from MongoDB (or local fallback)
- No CSP violations in console

**Tasks:**
- [ ] Update [api-client.ts](../src/services/api-client.ts) for CSP
- [ ] Add `/.proxy` prefix to relative URLs
- [ ] Configure URL mapping in Discord Portal
- [ ] Test MongoDB API calls
- [ ] Verify fallback to local questions works
- [ ] Check browser console for CSP errors
- [ ] Test on Discord desktop and mobile

**Success Criteria:**
- Questions load successfully
- No CSP errors in console
- Network tab shows successful requests

### Phase 3: Storage & State (Day 4)

**Goals:**
- Game state persists correctly
- Stats tracking works
- Daily question selection correct

**Tasks:**
- [ ] Test localStorage in Discord iframe
- [ ] Implement fallback if localStorage blocked
- [ ] Verify game state saves/loads
- [ ] Test stats persistence
- [ ] Verify [useDailyIndex.ts](../src/hooks/useDailyIndex.ts) works
- [ ] Test date/time handling across timezones

**Success Criteria:**
- Game progress persists across sessions
- Stats display correctly
- Daily question advances at midnight

### Phase 4: Polish & Test (Day 5)

**Goals:**
- UI looks great in Discord
- All features work
- Ready for beta testing

**Tasks:**
- [ ] Adjust UI for Discord iframe dimensions
- [ ] Test on desktop Discord
- [ ] Test on mobile Discord
- [ ] Test on web Discord
- [ ] Verify keyboard shortcuts work
- [ ] Check accessibility features (high contrast, etc.)
- [ ] Remove unused Auth0 code
- [ ] Update documentation

**Success Criteria:**
- App looks polished in all Discord clients
- All game features work
- No console errors
- Ready for production

### Phase 5: Multiplayer (Optional - Days 6-10)

**Goals:**
- Multiple users can play together
- Real-time state synchronization
- Enhanced social features

**Tasks:**
- [ ] Choose multiplayer library (see options below)
- [ ] Install multiplayer dependencies
- [ ] Adapt [gameStateStore.ts](../src/stores/gameStateStore.ts)
- [ ] Implement shared game state
- [ ] Add participant tracking
- [ ] Implement multiplayer UI
- [ ] Test with multiple users
- [ ] Handle edge cases (disconnects, etc.)

**Success Criteria:**
- Multiple users see same question
- Guesses sync in real-time
- Winner/progress tracking works

---

## Multiplayer Options

### Option 1: Solo Mode (Recommended for MVP)

**Complexity:** Low
**Timeline:** Included in Phase 1-4
**User Experience:** Each player plays independently

**Implementation:**
- Keep existing single-player logic
- Each user has their own game instance
- Use Discord SDK to share results in chat
- Track individual stats

**Pros:**
- Minimal code changes
- Faster to market
- No multiplayer complexity
- Matches current game design

**Cons:**
- Less social interaction
- Not utilizing Discord's multiplayer potential

**Code Changes:**
- Add Discord chat integration for sharing:
```typescript
// Share results in Discord channel
const shareResults = async () => {
  await discordSdk.commands.sendChannelMessage({
    channel_id: channelId,
    content: `I got today's Triviale in ${guessCount} guesses! 🎯`,
  });
};
```

### Option 2: Collaborative Mode (Enhanced)

**Complexity:** Medium-High
**Timeline:** +3-5 days
**User Experience:** All players work together

**Implementation:**
- Use `@robojs/sync` or similar library
- Shared question and progress
- All users see same state
- Combined score/achievement

**Library Options:**

#### A. @robojs/sync (Recommended)
```bash
npm install @robojs/sync
```

```typescript
import { useSync } from '@robojs/sync';

// In your component
const [sharedGuess, setSharedGuess] = useSync('currentGuess', []);
const [sharedProgress, setSharedProgress] = useSync('progress', 0);
```

**Pros:**
- Simple API (like useState)
- Automatic sync
- Built for Discord Activities

**Cons:**
- Less control over sync logic

#### B. Playroom Kit
```bash
npm install playroom-kit
```

```typescript
import { insertCoin, myPlayer, getState } from 'playroom-kit';

// Initialize
await insertCoin();

// Shared state
const gameState = getState();
gameState.set('currentGuess', newGuess);
```

**Pros:**
- Purpose-built for multiplayer
- Handles player management
- Good documentation

**Cons:**
- Another service dependency

#### C. Colyseus (Advanced)
```bash
npm install colyseus.js
```

**Pros:**
- Full control over server logic
- Scalable
- Battle-tested

**Cons:**
- Requires backend server
- More complex setup
- Higher latency

**Implementation Plan:**

1. **Adapt Game State**
```typescript
// New multiplayer game state store
interface MultiplayerGameState {
  sessionId: string;
  participants: Participant[];
  sharedGuesses: string[][];
  currentQuestion: number;
  revealedBy: string[]; // user IDs who completed
}
```

2. **Sync Game Actions**
```typescript
// When player makes guess
const makeMultiplayerGuess = async (guess: string[]) => {
  // Update local state
  makeGuess(guess);

  // Sync to other players
  await syncState.set('guesses', [...guesses, guess]);
};
```

3. **Show Participant Progress**
```typescript
// Display who's guessed what
<ParticipantList>
  {participants.map(p => (
    <ParticipantStatus
      user={p.user}
      guessCount={p.guesses.length}
      hasWon={p.hasWon}
    />
  ))}
</ParticipantList>
```

### Option 3: Competitive Mode (Advanced)

**Complexity:** High
**Timeline:** +5-7 days
**User Experience:** Race to answer first

**Features:**
- Real-time leaderboard
- First to answer wins round
- Speed bonuses
- Tournament brackets

**Best For:** Future enhancement after MVP success

---

## Technical Specifications

### Environment Variables

**Add to `.env.local`:**
```env
# Discord Configuration
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
VITE_DISCORD_CLIENT_ID=your_client_id_here

# MongoDB (existing)
VITE_MONGODB_API_URL=https://us-west-2.aws.data.mongodb-api.com

# App Configuration
VITE_APP_URL=https://your-vercel-domain.vercel.app
```

**Update Vercel Environment Variables:**
1. Go to Vercel project settings
2. Add environment variables
3. Redeploy

### Vite Configuration

**Update [vite.config.ts](../vite.config.ts) if needed:**

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local development proxy for Discord CSP testing
      '/.proxy': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.proxy/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
```

### TypeScript Types

**Add Discord SDK types:**

```typescript
// src/types/discord.d.ts
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
  avatar: string;
  global_name?: string;
}

export interface DiscordAuth {
  access_token: string;
  user: DiscordUser;
  scopes: string[];
  expires: string;
}
```

---

## Risk Assessment

### High Risk ⚠️

1. **CSP Restrictions**
   - **Impact:** App won't load or make API calls
   - **Mitigation:** Thorough testing, proper URL mapping, proxy setup
   - **Probability:** Medium (well-documented solutions exist)

2. **localStorage Limitations**
   - **Impact:** Game state/stats won't persist
   - **Mitigation:** Test early, implement Discord SDK storage fallback
   - **Probability:** Low-Medium (most iframes allow localStorage)

3. **Authentication Complexity**
   - **Impact:** Users can't login, blocked from features
   - **Mitigation:** Follow Discord docs exactly, thorough testing
   - **Probability:** Low (Discord SDK handles most complexity)

### Medium Risk ⚠️

4. **Mobile Discord Performance**
   - **Impact:** Laggy or broken experience on mobile
   - **Mitigation:** Test early on mobile, optimize performance
   - **Probability:** Low (your app is already mobile-friendly)

5. **Date/Time Handling**
   - **Impact:** Wrong daily question shown
   - **Mitigation:** Test [useDailyIndex.ts](../src/hooks/useDailyIndex.ts) thoroughly
   - **Probability:** Very Low (existing logic should work)

6. **Multiplayer Sync Issues**
   - **Impact:** (If implementing) Out-of-sync state, race conditions
   - **Mitigation:** Use battle-tested library, extensive testing
   - **Probability:** Medium (only if doing multiplayer)

### Low Risk ✅

7. **UI/UX in Discord**
   - **Impact:** Looks cramped or awkward
   - **Mitigation:** Your responsive design should handle it
   - **Probability:** Very Low

8. **Question Loading**
   - **Impact:** Questions don't load
   - **Mitigation:** You already have local fallback
   - **Probability:** Very Low

---

## Resources & References

### Official Documentation

- **Discord Embedded App SDK:** https://github.com/discord/embedded-app-sdk
- **Discord Activities Overview:** https://discord.com/developers/docs/activities/overview
- **Discord Activities How-To:** https://discord.com/developers/docs/activities/how-activities-work
- **Discord SDK Reference:** https://discord.com/developers/docs/developer-tools/embedded-app-sdk
- **Discord OAuth2:** https://discord.com/developers/docs/topics/oauth2

### Example Projects

- **Discord Activity Examples:** https://github.com/discord/embedded-app-sdk-examples
- **Colyseus Discord Template:** https://github.com/colyseus/discord-activity
- **Discord Activity Starter:** https://github.com/discord/embedded-app-sdk-examples/tree/main/discord-activity-starter

### Community Resources

- **CSP Compliance Guide:** https://dev.to/waveplay/patch-your-discord-activitys-network-requests-for-smooth-csp-compliance-432c
- **Multiplayer Guide:** https://dev.to/waveplay/how-to-add-multiplayer-to-your-discord-activity-lo1
- **Playroom Kit Docs:** https://docs.joinplayroom.com/components/discord

### Libraries for Multiplayer

- **@robojs/sync:** npm package for state sync
- **Playroom Kit:** https://docs.joinplayroom.com
- **Colyseus:** https://colyseus.io
- **Socket.io:** https://socket.io (more manual setup)

---

## Next Steps

### Immediate Actions

1. **Decision Point:** Solo vs. Multiplayer?
   - Recommend starting with solo mode
   - Can add multiplayer in Phase 2

2. **Create Discord Application**
   - Go to Discord Developer Portal
   - Create new application
   - Save Client ID and Secret

3. **Set Up Branch**
   ```bash
   git checkout -b discord-activity
   ```

4. **Begin Phase 1**
   - Install Discord SDK
   - Remove Auth0
   - Set up basic authentication

### Success Metrics

- **Week 1:** Working prototype in Discord
- **Week 2:** Beta testing with users
- **Week 3:** Production launch
- **Future:** Multiplayer features (optional)

---

## Questions & Decisions Needed

### Before Starting

1. **Multiplayer Scope:** Start with solo mode or plan for multiplayer?
   - **Recommendation:** Start solo, add multiplayer later

2. **MongoDB Access:** Will MongoDB API work with URL mapping?
   - **Action:** Test during Phase 2
   - **Fallback:** Local questions already work

3. **Authentication:** Do you need user profiles?
   - Discord provides user info automatically
   - Can remove UserProfilePage if not needed

4. **Daily Questions:** Keep same schedule or adjust for Discord?
   - **Recommendation:** Keep existing logic

5. **Deployment:** Use existing Vercel or separate deployment?
   - **Recommendation:** Use existing Vercel, add Discord branch

---

## Timeline Estimate

### Conservative (Solo Mode)
- **Phase 1:** 2 days - Core Discord integration
- **Phase 2:** 1 day - CSP & networking
- **Phase 3:** 1 day - Storage & state
- **Phase 4:** 1 day - Polish & testing
- **Total:** 5 days

### With Multiplayer
- **Phases 1-4:** 5 days (as above)
- **Phase 5:** 3-5 days - Multiplayer implementation
- **Total:** 8-10 days

---

## Notes

- This plan assumes you're comfortable with React/TypeScript (which you clearly are based on the codebase)
- Most of your existing code stays the same
- The main work is authentication plumbing and CSP handling
- Discord's SDK handles a lot of the complexity
- Your existing architecture is actually ideal for this conversion

---

**Created by:** Claude Code Investigation
**Status:** Ready to implement
**Last Updated:** 2025-10-11
