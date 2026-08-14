# Triviale Code Review — 2026-08-14

A pass over the React + TypeScript daily-trivia app — Zustand stores, the guess/keyboard grid, question data, and localStorage persistence — for efficiency, best practices, edge cases, error handling, and documentation.

- **Scope:** `src/` (37 files), `package.json`, README, eslint/tsconfig
- **Stack:** React 18 · TypeScript · Zustand · MUI · React Query · Auth0
- **Tests found:** 0 (at time of review; 43 tests across 9 files added same-day — see [Suggested test targets](#suggested-test-targets-for-the-pre-refactor-pass) below for what's now covered)
- **Reviewed at:** working tree HEAD, `main` up to date with `origin/main` (clean)

Rendered version (styled, same content): https://claude.ai/code/artifact/7f3587d8-b34b-4056-8d2c-f190fb17120f

**Tally:** 2 Critical · 4 High · 10 Moderate · 6 already-solid

> This doc went through one round of author review — see **Revisions** at the bottom before trusting the Critical/edge-case findings at face value. Two initial findings were retracted because the surrounding control flow already guarded against them; the details of *why* are worth reading if you're using this as a map for test cases, since they explain real invariants the code currently relies on.

---

## If you fix three things first

1. **Wrap every `JSON.parse(localStorage...)` in try/catch.** Two of the five call sites can currently blank-screen the entire app on boot from one bad value.
2. ~~Replace the non-null assertion in `Keyboard.tsx`'s question lookup with the same `?? ""` guard `GameGrid.tsx` already uses.~~ **Done 2026-08-14** — see the resolved Edge cases finding below. `HomePage.tsx`'s identical unguarded lookup (`data[safeIndex].question`) is a separate instance of the same pattern and is still open.
3. **Remove the module-scope hook calls and their eslint-disable** in the two stores. It works by accident, not by design, and the disable comment hides that from future edits.

---

## 1. Error handling

### 🔴 Critical — Unguarded `JSON.parse(localStorage)`, two copies run before React even mounts
`src/stores/hardModeStore.ts:13-14` · `src/stores/onscreenKeyboardOnlyStore.ts:12-13` · `src/pages/HomePage.tsx:124, 147`

Five call sites parse `localStorage.getItem("prevGame")`/`"gameStats"` with no `try/catch`. The two in the stores run at **module import time**, before the router's `errorElement` in `routes.tsx` exists to catch anything. One manually-edited or half-written value in `localStorage` throws a `SyntaxError` and the app fails to boot — a blank page, not the `ErrorPage` already built for exactly this situation.

```ts
// hardModeStore.ts — runs at import time, outside any try/catch
const existingGuesses = localStorage.getItem("prevGame") || "{}";
const pastGuesses = JSON.parse(existingGuesses); // throws → app never renders
```

**Fix:** add one shared `safeParse(key, fallback)` helper that try/catches and returns the fallback on failure; use it at all five sites instead of four near-identical copies of the unsafe version.

### 🟡 Moderate — Share failures are swallowed with a console.log
`src/components/navbar/stats/StatsDialog.tsx:150-153`

`navigator.share(...).catch(error => console.log("Error sharing", error))` gives the user zero feedback when a share fails (permission denial, no share target, etc.) — the button just appears to do nothing.

**Fix:** fall back to `handleCopy()` (which already shows a "copied" state) on share rejection, same as the no-native-share branch already does.

### 🟡 Moderate — No timeout, interceptors, or error surfacing on the API client
`src/services/api-client.ts:3-5` · `src/hooks/useMongoDBQuestions.tsx`

`axios.create({ baseURL })` has no timeout and no response/error interceptor, and the one hook that uses it discards the query's `error` entirely. Harmless while the MongoDB path is disabled, but worth setting up before it's turned back on so a slow/broken endpoint doesn't hang the question load silently.

**Fix:** add a request timeout and a response interceptor that normalizes/logs failures; surface `error`/`isError` from the hook instead of dropping it.

---

## 2. Edge cases

### ✅ Resolved 2026-08-14 — Non-null assertion papers over a real undefined case
`src/components/keyboard/Keyboard.tsx:37-39` (pre-fix line numbers)

Was: `useQuestionByID(safeIndex)?.answer.toLocaleUpperCase()!` — the `?.` protected `.answer`, but the trailing `!` claimed the result could never be `undefined`, so a missed lookup would throw on the next line's `.replace()`.

Fixed by switching to the same `?? ""` guard `GameGrid.tsx` already used — landed together with the `getStatus` hook-fan-out fix directly below, since both touched the same lines.

**Still open:** the broader "one shared hook" consolidation this finding originally suggested wasn't done. `HomePage.tsx`'s `data[safeIndex].question` lookup (see the Moderate edge-case finding below) is the same pattern, still unguarded.

### 🟠 High — `advancedStats[c]` assumes a fixed category set the type doesn't enforce
`src/data/questions.ts:1` · `src/pages/HomePage.tsx:300-323`

`Category` is typed as `"SCI" | "HIS" | "ART" | "REL" | "GEO" | "POP" | string` — the trailing `| string` means TypeScript accepts any category, but `advancedStats` is only ever initialized for the six fixed categories in `ALL_CATEGORIES`. Any custom/imported question with a different category makes `advancedStats[c]` `undefined`, and the next line's `.questionsGuessedIn.map(...)` throws.

**Fix:** either drop the `| string` escape hatch from `Category`, or initialize/guard `advancedStats[c]` lazily before writing to it.

### 🟡 Moderate — `indexOfLastGuess` can be -1 and silently mis-records a stat
`src/pages/HomePage.tsx:282-298`

For a question with zero submitted guesses, `allGuessesForQuestion.filter(...).length - 1` is `-1`. `todaysQuestionsGuessedIn[-1] += guessIncrease` doesn't throw (JS arrays accept string keys), it just creates a stray `"-1"` property instead of recording the stat anywhere real. Invisible today because `QUESTIONS_PER_DAY` is 1 so this multi-question branch barely runs, but it's live code.

**Fix:** clamp/skip when `guessIndex < 0` before indexing into `todaysQuestionsGuessedIn`.

### 🟡 Moderate — HomePage's `data[safeIndex]` access has no bounds guard
`src/pages/HomePage.tsx:53-70`

`getPositiveIndex` wraps against the length of the local `questions` array (imported directly in `useDailyIndex.ts`), while `data` in `HomePage.tsx` comes from `useQuestions()`. Today both resolve to the same array, so it's safe by coincidence — but the moment `useQuestions`' commented-out MongoDB path (see Documentation, below) comes back and `data` can have a different length or be temporarily empty, this becomes an unguarded out-of-range read with no fallback, unlike the `?? ""` pattern used in `GameGrid.tsx`.

**Fix:** guard this the same way `GameGrid.tsx` already does, before the MongoDB path is re-enabled.

---

## 3. Best practices

### 🟠 High — React hooks called at module scope, with the lint rule disabled to allow it
`src/stores/hardModeStore.ts:11-12` · `src/stores/onscreenKeyboardOnlyStore.ts:10-11`

Both files call `useDailyIndex()` at the top level of the module — not inside a component or a hook — behind `// eslint-disable-next-line react-hooks/rules-of-hooks`. It only works because `useDailyIndex` happens not to call any real React hook internally (no `useState`/`useEffect`/`useContext`). That's an implementation detail of a function named like a hook, not a guarantee — the lint rule exists precisely to catch this, and disabling it hides the risk instead of removing it. Any future edit to `useDailyIndex` that adds a real hook breaks the app at import time, everywhere.

To be clear, computing this once per page load — not re-evaluating as the clock ticks — looks intentional and is the right call: it's what keeps a session started at 11:50pm on today's question instead of yanking the player onto tomorrow's mid-guess. That freeze-per-session behavior is worth keeping exactly as-is. The concern here is only the mechanism: a hook-named function called outside React, with the lint rule that guards against that silenced rather than addressed.

**Fix:** rename `useDailyIndex`'s underlying date math to a plain (non-`use`-prefixed) function and call *that* once at module scope instead — same one-per-load freeze, no disable comment needed. The two stores can also stop duplicating the `fromToday`/`pastGuesses` computation between them.

### ✅ Resolved 2026-08-14 — Keyboard's `getStatus` calls four hooks per key, 26 times per render
`src/components/keyboard/Keyboard.tsx:29-70, 140, 152, 174` (pre-fix line numbers)

Was: `getStatus(val)` was invoked once per rendered key — 26 times per render — and each call internally re-ran `useDailyIndex()`, two `useGameStateStore()` selectors, `useRetrievedStore()`, and `useQuestionByID()`, plus a couple of `.reduce()` passes over `guesses`. All 26 calls computed the exact same `answer`/`safeIndex`.

Fixed by hoisting the hook calls and derived `answer`/`guesses`/`questionNumber`/`guessNumber` to the top of `Keyboard`, and turning `getStatus` into a plain function that takes those as arguments instead of calling hooks itself. (This was also an actual `react-hooks/rules-of-hooks` lint violation — calling hooks from a non-component function — surfaced when CI was set up; see `CLAUDE.md`'s Known gotchas.)

**Still open:** `useQuestionByID`'s O(n) `.find()` instead of O(1) indexing (see the still-open Moderate finding below) — orthogonal to this fix, not addressed by it.

### 🟠 High — Store state mutated directly, bypassing Zustand's `set()`
`src/pages/HomePage.tsx:300-322`

`advancedStats[c] = { ...advancedStats[c], ... }` mutates the object returned from `useStatsStore()` in place, outside of any `set()` call. Every other update in the codebase goes through immutable `set()` updates; this one silently breaks that convention, so subscribers relying on reference-equality checks may not re-render, and the mutation happens outside Zustand's change-tracking entirely.

**Fix:** add an `updateAdvancedStats` action to `statsStore.ts` that does this update through `set()`, and call that from `HomePage.tsx` instead of mutating the destructured object.

### 🟡 Moderate — `Array(n).fill([])` shares one array reference across every slot
`src/stores/gameStateStore.ts:29-32`

`Array(MAX_CHALLENGES).fill([])` fills every challenge slot with *the same* array instance, and `Array(QUESTIONS_PER_DAY).fill(Array(...))` does the same one level up. It's harmless today only because every update goes through `.map()` (which allocates fresh arrays), so the shared initial reference never gets mutated in place. It's a footgun the moment `QUESTIONS_PER_DAY` goes above 1 (per the README's "three new questions every day") or any future code mutates a guess array directly.

```ts
guesses: Array(QUESTIONS_PER_DAY).fill(Array(MAX_CHALLENGES).fill([])),
// every question, every challenge slot → same [] reference
```

**Fix:** build with `Array.from({ length }, () => ...)` so each slot gets its own array.

### 🟡 Moderate — Side effects run directly in the render body, not in useEffect
`src/pages/ErrorPage.tsx:13-14` · `src/components/auth/PrivateRoutes.tsx:7-8`

Both components call `closeAllDialogs()` — a store-mutating action — directly in the function body during render, rather than inside `useEffect`. Render is supposed to be pure; calling a state-mutating action on every render (including re-renders unrelated to navigation) works today but is fragile and is the same category of bug React's strict mode exists to catch.

**Fix:** move `closeAllDialogs()` into a `useEffect(() => closeAllDialogs(), [])` in both components.

### 🟡 Moderate — Dead/disabled data-fetching hook, unused query result
`src/hooks/useMongoDBQuestions.tsx` · `src/hooks/useQuestions.ts`

`useMongoDBQuestions` builds a full `useQuery` call and never returns or uses its result — the hook always returns `undefined`. `useQuestions` hardcodes a return of the local `questions` array with ~20 lines of the real MongoDB-backed logic commented out below it, plus a stray `console.log(questionID)` for an effectively-unused parameter.

**Fix:** either finish and wire up the MongoDB path, or delete the dead code and the unused `questionID` parameter until it's ready — the commented block will only drift further from working as the rest of the code around it changes.

### 🟡 Moderate — `visibilitychange` listener re-attached on every render
`src/pages/HomePage.tsx:87-92`

The `useEffect` that wires up the tab-close save listener has no dependency array, so React tears down and re-adds the `window` listener on every single render of `HomePage`, not just when relevant state changes.

**Fix:** keep the latest save-handler in a `ref` and register the listener once with `[]`, or accept the dependency array and list the actual state it closes over.

### 🟡 Moderate — `useQuestionByID` scans the array instead of indexing it
`src/hooks/useQuestionByID.ts:5`

`data.find((_, i) => i === id)` is an O(n) scan to do what `data[id]` does in O(1) — called from inside the 26x-per-render loop in `Keyboard.tsx` above.

**Fix:** `return data[id];`

### 🟡 Partially resolved 2026-08-14 — No automated tests
Was: no test runner in `package.json`, no `*.test.*` files in `src/`

Vitest + React Testing Library were already wired up (`vitest.config.ts`, `tests/setup.ts`) by the time of this pass, but coverage was still effectively zero — just a placeholder and two full-router integration tests. Added 43 tests across 9 files: `tests/hooks/useDailyIndex.test.ts`, `useTodayAsInt.test.ts`, `tests/stores/gameStateStore.test.ts`, `hardModeStore.test.ts`, `onscreenKeyboardOnlyStore.test.ts`, and component tests for `ProgressBar.tsx` and `Keyboard.tsx`. `tests/` now mirrors `src/`'s subfolders, and the two existing integration tests moved into `tests/integration/`.

**Still open:** the highest-value target — `GameGrid.tsx`'s `getStatuses`, flagged in this review as pure logic that "currently contain[s] real bugs" — is still untested. It's an unexported closure inside the component, so testing it directly needs the extract-to-pure-function refactor mentioned under Best Practices first; that refactor was explicitly deferred rather than done as part of this pass. `HomePage.tsx`'s `onEnter` answer-matching is also still untested (deep Auth0/MongoDB/router dependencies). See the updated checklist under Suggested test targets below for the full picture.

### 🟡 Moderate — Orphaned file with a third-party script snippet
`src/components/ConsentBanner`

An extensionless file containing a single `<script>` tag (a Termly cookie-consent resource blocker) that isn't imported anywhere in `src` — it's not part of the build and doesn't reach the page.

**Fix:** either move the snippet into `index.html`/`public` where it'll actually load, or delete the file if the consent banner is handled elsewhere.

### ✅ Resolved 2026-08-14 — Two lockfiles for two different package managers, tracked side by side
`package-lock.json` (new) · `yarn.lock` (removed)

That commit had added a brand-new `package-lock.json` while continuing to update the pre-existing `yarn.lock`, leaving two lockfiles that could silently drift apart on the next dependency change. Resolved by standardizing on npm — confirmed npm is what's actually installed and what populated the current `node_modules` on this machine, then removed `yarn.lock` and the `yarn` package dependency and ran a clean `npm install`.

---

## 4. Documentation completeness

### 🟡 Moderate — Copy-pasted "Game Epoch" comment no longer matches the code
`src/hooks/useDailyIndex.ts:1, 5` · `src/hooks/useTodayAsInt.ts:1`

Both files open with `// 13 December 2023 Game Epoch`. In `useDailyIndex.ts`, the actual `firstGameDate` is `new Date(2024, 10, 22)` — 22 November 2024 — so the comment describes a date the code no longer uses. In `useTodayAsInt.ts` the comment is entirely unrelated to what that function does (it just formats today's date as a `YYYYMMDD` int).

**Fix:** update or remove the comment in `useDailyIndex.ts` to match `firstGameDate`, and drop it entirely from `useTodayAsInt.ts`.

### 🟡 Moderate — README feature list doesn't match the shipped config
`README.md:43` ("Three new questions every day") · `src/constants/settings.ts:2`

`QUESTIONS_PER_DAY = 1`, not three. This isn't just a stale doc — it also means the multi-question code paths (the per-question stats loop and the `guesses` array-of-arrays in `gameStateStore.ts`) are effectively unexercised in production, which is exactly where the shared-array-reference and `-1`-index findings above are hiding.

**Fix:** either update the README to reflect the current single-question mode, or treat restoring `QUESTIONS_PER_DAY > 1` as a real feature with the edge cases above fixed first.

### 🟡 Moderate — No documentation of the persisted-state shape
localStorage keys `"prevGame"`, `"gameStats"`, `"hardMode"`, `"onscreenKeyboardOnly"`, `"theme"`

The shape of what's saved to `localStorage` is defined only by the object literals passed to `JSON.stringify` in `HomePage.tsx`, and read back by string key (`pastStats["numQuestionsAttempted"]`, etc.) in four different files with no shared type. Nothing documents the schema or which fields are required for a successful import, which makes the unguarded `JSON.parse` issue above easier to introduce and harder to notice.

**Fix:** define one `PersistedGame`/`PersistedStats` type used by both the writer (`HomePage.tsx`) and readers (the two stores), instead of matching string keys by convention.

### 🟡 Moderate — Repeated, unexplained index expression with no shared helper
`src/components/grid/GameGrid.tsx:16-18` · `src/components/keyboard/Keyboard.tsx:34-36` · `src/pages/HomePage.tsx:50-52`

`getPositiveIndex(questionNumber + (retrieved ? 0 : dailyIndex))` appears verbatim in three files with no comment anywhere explaining what the `retrieved` branch means or why it changes how the index is computed.

**Fix:** extract this into one shared `useSafeQuestionIndex()` hook with a comment on what "retrieved" represents — fixes the duplication and the missing explanation at once.

### 🟡 Moderate — Setup instructions omit required environment configuration
README.md "Setup" section

The README's setup steps are `npm install` → `npm run dev`, but the app depends on Auth0 (domain/client ID) and a MongoDB-backed API endpoint per the "Technical Info" section above it. Nothing in Setup mentions the env vars or config needed to run auth or data-fetching locally.

**Fix:** add the required env vars (with a `.env.example`) to Setup, or note explicitly which features work without them.

---

## 5. Efficiency

The efficiency issues found are the same root causes flagged under Best Practices above — `getStatus`'s 26x-per-render hook fan-out, the O(n) `useQuestionByID` lookup, the dependency-less `visibilitychange` effect, and the unmemoized permutation math in `GameGrid.tsx`'s own `// TODO: Memoize` comment — rather than a separate list, since fixing the hook/data-access pattern in each case is also the efficiency fix.

---

## What's already solid

- `tsconfig.json` runs `strict`, `noUnusedLocals`, and `noUnusedParameters` — real baseline rigor, not just `"strict": true` for show.
- Zustand stores mostly follow immutable-update conventions correctly — the direct-mutation case above is the exception, not the pattern.
- `getPositiveIndex`'s double-modulo trick for negative-safe wraparound (`((index % len) + len) % len`) is a small, genuinely correct piece of code.
- `ErrorPage.tsx` correctly discriminates `isRouteErrorResponse` / `Error` / `string` / unknown before rendering — good defensive shape-checking where it's actually applied.
- Clean separation of concerns (stores / hooks / components / data) and idiomatic Auth0-React usage via `withAuthenticationRequired` in `PrivateRoutes.tsx`.
- "Today" is deliberately frozen to whatever it was when the tab loaded, everywhere in the app, not re-checked as the clock ticks — so a session started at 11:50pm stays on that question through midnight instead of yanking the player onto tomorrow's mid-guess. Good, intentional game design; only the way it's wired up (see Best Practices) needs hardening.

---

## Suggested test targets (for the pre-refactor pass)

Given "no automated tests" is itself a finding, and the plan is to write tests before the refactor, these are the spots in this report where a test would both document current (intended) behavior and catch a regression during the refactor. Updated 2026-08-14 with what's now covered:

- [x] `gameStateStore.ts`'s `moveToNextQuestion` / win-lose transition — `tests/stores/gameStateStore.test.ts`. Includes a test that pins the store-level `-1` behavior down directly (calling `moveToNextQuestion()` once every question is won/lost) — consistent with Revision #1 below, which found that behavior unreachable via the app's actual, guarded call sites, but it's still what the store method itself does if called directly, which is worth having pinned down.
- [x] `hardModeStore.ts`/`onscreenKeyboardOnlyStore.ts`'s `fromToday` gate — `tests/stores/hardModeStore.test.ts`, `onscreenKeyboardOnlyStore.test.ts`. Covers the "freeze today for the session" behavior from Revision #2 below across both stores, plus the toggle/set actions and their localStorage persistence.
- [x] `getPositiveIndex` — negative and over-length inputs — `tests/hooks/useDailyIndex.test.ts`, alongside `useDailyIndex`'s own epoch-offset math and a new `useTodayAsInt.test.ts` for the sibling date-formatting hook.
- [ ] `GameGrid.tsx`'s `getStatuses` — letter-by-letter correct/present/absent logic, including the `SKIPPED_TEXT` short-circuit. **Still not tested** — needs the extract-to-pure-function refactor (Best Practices, above) first, since it's currently an unexported closure. This remains the single highest-priority gap: it's the pure logic this review flagged as containing real bugs.
- [ ] Answer-matching in `HomePage.tsx`'s `onEnter` — exact match, `altAnswer` matches, and the addOn-permutation matching in hard mode. **Still not tested** — deep dependencies (Auth0, MongoDB question hook, router) make this a bigger lift; would follow the same mocking pattern as `tests/integration/routing.test.tsx`.
- [ ] A `safeParse`/localStorage round-trip test, once the unguarded `JSON.parse` finding above is fixed — corrupted-value input should not throw. **Still blocked** on that fix landing first.

Also added beyond this original list: `tests/components/progressBar/ProgressBar.test.tsx` and `tests/components/keyboard/Keyboard.test.tsx` (rendering, click handlers, and — via `Keyboard`'s letter-status coloring — an indirect check on the same success/warning/error classification `GameGrid.tsx` needs, using a real question's answer rather than `GameGrid` itself).

---

## Revisions

This report went through one round of author review. Two findings from the original draft were retracted after discussion — both are worth understanding if you're using this doc as a reference during the refactor, since they document real (if implicit) invariants in the current code:

1. **Retracted — "`moveToNextQuestion` sets `questionNumber` to -1 and crashes the keyboard."** Traced both call sites: `HomePage.tsx`'s `onEnter` only reaches `moveToNextQuestion()` in a branch that's unreachable unless `questionState.includes("inProgress")` is still true (the earlier `if (!questionState.includes("inProgress") || ...) { ...; return; }` guards it), and `ExpandableText.tsx`'s "Next Question" button gates on `gameState === "inProgress"`, which is only true before `winGame()`/`loseGame()` fire — and those only fire once no question remains in progress. So `indexOf("inProgress")` can't actually return -1 at either call site. Not reachable as originally reported.

2. **Retracted — "Hard-mode / onscreen-keyboard 'today' check only evaluates once, at page load."** This is intentional: a session started before midnight should keep its in-progress question and settings rather than switch out from under the player mid-guess. The freeze is achieved consistently app-wide via a module-scope `presentDate` constant in `useDailyIndex.ts` (evaluated once per page load, shared by every consumer). The remaining concern — flagged under Best Practices — is only that the freeze is implemented via a hook-named function called outside React with the relevant lint rule disabled, which is fragile, not that the freeze itself is wrong.

3. **Retracted — "Dead config key: `allowScripts` is not a real npm/Yarn setting."** This one wasn't caught by author pushback — it surfaced while actually doing the npm/yarn cleanup below. Running `npm install` produced `npm warn allow-scripts ... esbuild@0.25.12 (postinstall: node install.js) ... Run npm approve-scripts`. `allowScripts` is a real, currently-active npm 11 feature (npm's native answer to pnpm/yarn-Berry-style install-script gating) and it had correctly been gating `esbuild`'s postinstall script the whole time. The field was restored — scoped to just the still-real `esbuild@0.25.12` entry — via `npm approve-scripts esbuild`, rather than left removed. The lesson: a finding sourced from an automated review pass still needs independent verification before being reported as fact, same as any other finding.
