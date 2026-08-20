# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Setup is just `npm install && npm run dev` (→ `http://localhost:5173/`) — no env vars needed. Auth0 domain/clientId (`src/pages/Layout.tsx`) and the MongoDB Data API base URL (`src/services/api-client.ts`) fall back to hardcoded production values when `VITE_AUTH0_DOMAIN`/`VITE_AUTH0_CLIENT_ID`/`VITE_API_BASE_URL` aren't set (see `.env.example`).

## Commands

- `/verify` — project skill that runs lint → test → build in sequence; a GitHub Actions workflow (`.github/workflows/ci.yml`) runs the same three checks on push/PR to `main`/`production`, but run `/verify` locally before pushing rather than waiting on CI to catch it

## Testing

- Vitest config does not set `test.globals` — import `describe`/`it`/`expect` etc. from `vitest` explicitly rather than relying on globals.
- `tests/setup.ts` handles React Testing Library cleanup and a jsdom `matchMedia` polyfill (MUI needs it) — don't re-add per-test cleanup.
- Reset Zustand stores between tests with `store.setState(store.getInitialState(), true)`, matching existing tests under `tests/stores/`.
- `tests/` mirrors `src/`'s structure (`hooks/`, `stores/`, `components/`, `integration/`).

## Branches and deploy

- `main` is the working/staging branch. Pushing to the `production` branch (lowercase — easy to mistype as `Production`) is what triggers the live Vercel deploy via Vercel's GitHub integration — the branch names are not what you'd expect from convention. Use the `/deploy` skill for this (it confirms before pushing).
- `badges` is a CI-managed orphan branch holding only `coverage.json` (read by the README's coverage badge, see `.github/workflows/ci.yml`'s "Update coverage badge" step) — not an app branch. Vercel is stopped from building it via a custom **Ignored Build Step** in the Vercel dashboard (Project Settings → Build and Deployment): `if [ "$VERCEL_GIT_COMMIT_REF" = "badges" ]; then exit 0; else exit 1; fi`. `vercel.json`'s `git.deploymentEnabled.badges: false` looks like it should do this instead, but doesn't — see Known gotchas below.
- CI (`.github/workflows/ci.yml`) runs lint/test/build on push and PR to `main` and `production`. It does not deploy — deployment is still Vercel's git integration, untouched by Actions.

## Known gotchas

- `src/constants/settings.ts` sets `QUESTIONS_PER_DAY = 3` (2026-08-16, up from 1) — README's "three new questions every day" is now accurate, and the multi-question code paths (per-question stats loop, `guesses` array-of-arrays) are live, not dead. If you're touching those paths, they're exercised in production now.
- `src/hooks/useQuestions.ts` reads from local `src/data/questions.ts`; the MongoDB-backed fetch path is commented out. The real backend is not wired up.
- `main.py` (a Lambda handler for a MongoDB "ping") is dead/experimental — not part of the build or deploy pipeline, not referenced by any npm script. It contains a hardcoded MongoDB username and a block explicitly commented `# [VULN] SQL Injection`. Don't reactivate or copy from it without scrubbing credentials and rewriting that block.
- For known issues in the current `src/` (error handling, edge cases, etc.), see @Claude-notes/code-review-2026-08-14.md and its follow-up pass @Claude-notes/code-review-2026-08-17.md (different files/areas covered, neither supersedes the other) — read both before assuming a file is clean, and update the relevant one if you fix or invalidate something it lists.
- When pinning or changing a Node/npm/tool version anywhere (CI workflows, Dockerfiles, etc.), check the actual `engines` field of the relevant package (e.g. `node_modules/<pkg>/package.json`) instead of guessing a generic "safe" LTS version. `.github/workflows/ci.yml` originally pinned Node 20 as just such a guess; `jsdom` (a test devDependency) actually requires `^22.22.2 || ^24.15.0 || >=26.0.0`, so Node 20 crashed every test worker in CI with an opaque `webidl.util.markAsUncloneable is not a function` error that didn't reproduce locally (this machine runs Node 24, which satisfies jsdom's range).
- `vercel.json`'s `git.deploymentEnabled` (added 2026-08-17 to exclude the `badges` branch) never actually stopped Vercel from building it, discovered 2026-08-19 when a `badges` push still produced a real (errored) deployment. Root cause: Vercel reads `vercel.json` from the commit it's building, and the `badges` branch's own CI step (`git rm -rf .` on an orphan branch, keeping only `coverage.json`) never includes `vercel.json` — so the exclusion rule, which only ever existed on `main`, was invisible to every `badges` build. Fixed by moving the exclusion to a custom **Ignored Build Step** in Vercel's Project Settings (Build and Deployment), which is evaluated via the `VERCEL_GIT_COMMIT_REF` system env var independent of what's in the branch's tree. The lesson generalizes: don't rely on repo-committed config (`vercel.json`, or anything else) to gate behavior on a branch that doesn't reliably carry that file — use a platform-level setting instead.
