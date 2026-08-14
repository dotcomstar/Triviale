# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Setup is just `npm install && npm run dev` (→ `http://localhost:5173/`) — no env vars needed. Auth0 domain/clientId (`src/pages/Layout.tsx`) and the MongoDB Data API base URL (`src/services/api-client.ts`) are hardcoded directly in source, not env-driven.

## Commands

- `/verify` — project skill that runs lint → test → build in sequence; a GitHub Actions workflow (`.github/workflows/ci.yml`) runs the same three checks on push/PR to `main`/`production`, but run `/verify` locally before pushing rather than waiting on CI to catch it

## Testing

- Vitest config does not set `test.globals` — import `describe`/`it`/`expect` etc. from `vitest` explicitly rather than relying on globals.
- `tests/setup.ts` handles React Testing Library cleanup and a jsdom `matchMedia` polyfill (MUI needs it) — don't re-add per-test cleanup.
- Reset Zustand stores between tests with `store.setState(store.getInitialState(), true)`, matching existing tests under `tests/stores/`.
- `tests/` mirrors `src/`'s structure (`hooks/`, `stores/`, `components/`, `integration/`).

## Branches and deploy

- `main` is the working/staging branch. Pushing to the `production` branch (lowercase — easy to mistype as `Production`) is what triggers the live Vercel deploy via Vercel's GitHub integration — the branch names are not what you'd expect from convention. Use the `/deploy` skill for this (it confirms before pushing).
- CI (`.github/workflows/ci.yml`) runs lint/test/build on push and PR to `main` and `production`. It does not deploy — deployment is still Vercel's git integration, untouched by Actions.

## Known gotchas

- README says "three new questions every day," but `src/constants/settings.ts` sets `QUESTIONS_PER_DAY = 1`, and the multi-question code paths are effectively dead. Don't trust that line of the README.
- `src/hooks/useQuestions.ts` reads from local `src/data/questions.ts`; the MongoDB-backed fetch path is commented out. The real backend is not wired up.
- `main.py` (a Lambda handler for a MongoDB "ping") is dead/experimental — not part of the build or deploy pipeline, not referenced by any npm script. It contains a hardcoded MongoDB username and a block explicitly commented `# [VULN] SQL Injection`. Don't reactivate or copy from it without scrubbing credentials and rewriting that block.
- For known issues in the current `src/` (error handling, edge cases, etc.), see @Claude-notes/code-review-2026-08-14.md — read it before assuming a file is clean, and update it if you fix or invalidate something it lists.
- When pinning or changing a Node/npm/tool version anywhere (CI workflows, Dockerfiles, etc.), check the actual `engines` field of the relevant package (e.g. `node_modules/<pkg>/package.json`) instead of guessing a generic "safe" LTS version. `.github/workflows/ci.yml` originally pinned Node 20 as just such a guess; `jsdom` (a test devDependency) actually requires `^22.22.2 || ^24.15.0 || >=26.0.0`, so Node 20 crashed every test worker in CI with an opaque `webidl.util.markAsUncloneable is not a function` error that didn't reproduce locally (this machine runs Node 24, which satisfies jsdom's range).
