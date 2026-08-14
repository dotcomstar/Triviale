---
name: verify
description: Run this repo's full self-check (lint, test, build) before considering a change done. There is no CI here, so this is the substitute — use it before telling the user a task is complete.
---

Run these three commands in order from the repo root, stopping at (and reporting) the first failure:

1. `npm run lint` — ESLint with `--max-warnings 0`. A single warning is a failure, not just errors.
2. `npm test` — Vitest. If a specific area was touched, you may run a scoped subset first for speed, but a full `npm test` must pass before calling the task done.
3. `npm run build` — `tsc && vite build`. This is the real type-check (the project has `noEmit` in tsconfig, so `tsc` here only checks, it doesn't emit).

If all three pass, say so briefly. If any fail, show the actual failing output (not a paraphrase) and fix it before re-running the full sequence — don't skip ahead to build if lint or test failed.
