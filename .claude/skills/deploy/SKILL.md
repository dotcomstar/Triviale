---
name: deploy
description: Deploy Triviale to production by merging main into the production branch and pushing. User-triggered only — do not invoke this automatically.
disable-model-invocation: true
---

Pushing to the `production` branch triggers Vercel's live deploy — this is a real, user-visible push to shared state, not a local operation.

Steps:

1. Run `git status` and confirm the working tree is clean and `main` is up to date with `origin/main`. If not, stop and tell the user.
2. Show the user what will ship: `git log origin/production..main --oneline` (the commits that are about to go live).
3. Confirm with the user before doing anything that pushes. Do not skip this even if a similar deploy was approved earlier in the conversation.
4. Once confirmed: fetch, fast-forward or merge `main` into a local `production` branch, then `git push origin production`.
5. Report the pushed commit range and remind the user Vercel will auto-deploy from the `production` branch.

Never force-push. If `production` has diverged in a way that isn't a clean fast-forward/merge, stop and ask the user how they want to resolve it rather than guessing.
