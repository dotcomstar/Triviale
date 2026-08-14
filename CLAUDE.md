# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Setup is just `npm install && npm run dev` (→ `http://localhost:5173/`) — no env vars needed. Auth0 domain/clientId (`src/pages/Layout.tsx`) and the MongoDB Data API base URL (`src/services/api-client.ts`) are hardcoded directly in source, not env-driven.

## Commands

- `/verify` — project skill that runs lint → test → build in sequence; there is no CI, so use this before considering a change done

## Testing

- Vitest config does not set `test.globals` — import `describe`/`it`/`expect` etc. from `vitest` explicitly rather than relying on globals.
- `tests/setup.ts` handles React Testing Library cleanup and a jsdom `matchMedia` polyfill (MUI needs it) — don't re-add per-test cleanup.
- Reset Zustand stores between tests with `store.setState(store.getInitialState(), true)`, matching existing tests under `tests/stores/`.
- `tests/` mirrors `src/`'s structure (`hooks/`, `stores/`, `components/`, `integration/`).

## Branches and deploy

- `main` is the working/staging branch. Pushing to the `Production` branch is what triggers the live Vercel deploy — the branch names are not what you'd expect from convention. Use the `/deploy` skill for this (it confirms before pushing).
- No CI is configured (no `.github/workflows`).

## Known gotchas

- README says "three new questions every day," but `src/constants/settings.ts` sets `QUESTIONS_PER_DAY = 1`, and the multi-question code paths are effectively dead. Don't trust that line of the README.
- `src/hooks/useQuestions.ts` reads from local `src/data/questions.ts`; the MongoDB-backed fetch path is commented out. The real backend is not wired up.
- `main.py` (a Lambda handler for a MongoDB "ping") is dead/experimental — not part of the build or deploy pipeline, not referenced by any npm script. It contains a hardcoded MongoDB username and a block explicitly commented `# [VULN] SQL Injection`. Don't reactivate or copy from it without scrubbing credentials and rewriting that block.
- For known issues in the current `src/` (error handling, edge cases, etc.), see @Claude-notes/code-review-2026-08-14.md — read it before assuming a file is clean, and update it if you fix or invalidate something it lists.
