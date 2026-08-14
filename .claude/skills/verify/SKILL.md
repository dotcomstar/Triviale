---
name: verify
description: Run this repo's full self-check (lint, test, build) before considering a change done. A GitHub Actions CI workflow runs the same three checks on push/PR, but run this locally first rather than waiting on CI to catch it.
---

Run these three commands in order from the repo root, stopping at (and reporting) the first failure:

1. `npm run lint` — ESLint with `--max-warnings 0`. A single warning is a failure, not just errors.
2. `npm test` — Vitest. If a specific area was touched, you may run a scoped subset first for speed, but a full `npm test` must pass before calling the task done.
3. `npm run build` — `tsc && vite build`. This is the real type-check (the project has `noEmit` in tsconfig, so `tsc` here only checks, it doesn't emit).

If all three pass, say so briefly. If any fail, show the actual failing output (not a paraphrase) and fix it before re-running the full sequence — don't skip ahead to build if lint or test failed.

Before calling the task done, also check the touched files against the most recent `Claude-notes/code-review-*.md`: if the change fixes, partially fixes, or invalidates a finding it lists, update that finding in place — mark it `✅ Resolved <date>` or `🟡 Partially resolved <date>` (matching the doc's existing convention), with a short note on what changed and what, if anything, is still open. This doc exists so future work doesn't have to re-derive known issues by re-reading the whole codebase; it only stays useful if it's kept current.
