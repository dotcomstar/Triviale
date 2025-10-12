# User Guides

This directory contains setup and usage guides for the Triviale Discord Activity.

---

## Available Guides

### 1. [DISCORD_SETUP.md](DISCORD_SETUP.md)
**Initial Discord Activity Setup Instructions**

Complete guide for the initial setup of Triviale as a Discord Activity, including:
- Discord Developer Portal configuration
- Environment variable setup
- OAuth2 configuration
- URL mapping setup
- Deployment to Vercel
- Testing procedures
- Troubleshooting common issues

**Use this guide when:** Setting up the Discord Activity for the first time or deploying to production.

---

### 2. [LOCAL_DISCORD_SETUP.md](LOCAL_DISCORD_SETUP.md)
**Local Development Setup with Cloudflare Tunnels**

Step-by-step guide for running Triviale locally and testing in Discord, including:
- Installing Cloudflare tunnel (`cloudflared`)
- Setting up local development environment
- Running dev server with tunnel
- Configuring Discord Portal for local testing
- Development workflow
- Debugging tips
- Troubleshooting

**Use this guide when:** Developing locally and need to test changes in Discord before deploying.

---

## Quick Reference

### Local Development
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Start tunnel
cloudflared tunnel --url http://localhost:5173
```

### Production Deployment
```bash
# Build and deploy
npm run build
git push  # Auto-deploys to Vercel
```

---

## Document Status

| Guide | Status | Last Updated |
|-------|--------|--------------|
| DISCORD_SETUP.md | ✅ Complete | 2025-10-11 |
| LOCAL_DISCORD_SETUP.md | ✅ Complete | 2025-10-12 |

---

## Related Documentation

- **Project Plan:** [.claude/plans/discord-activity-conversion.md](../plans/discord-activity-conversion.md)
- **Project Overview:** [CLAUDE.md](../../CLAUDE.md)
- **Discord SDK Docs:** https://github.com/discord/embedded-app-sdk
- **Discord Activities Docs:** https://discord.com/developers/docs/activities/overview

---

## Getting Help

If you encounter issues not covered in these guides:

1. Check the **Troubleshooting** sections in each guide
2. Review the [discord-activity-conversion.md plan](../plans/discord-activity-conversion.md)
3. Check Discord Developer Documentation
4. Review browser console for error messages
5. Check Network tab for failed requests

---

**Maintained by:** Claude Code
**Project:** Triviale Discord Activity Conversion
