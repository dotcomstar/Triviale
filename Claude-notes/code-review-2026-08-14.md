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

1. ~~Wrap every `JSON.parse(localStorage...)` in try/catch.~~ **Done 2026-08-16** — see the resolved Critical finding below.
2. ~~Replace the non-null assertion in `Keyboard.tsx`'s question lookup with the same `?? ""` guard `GameGrid.tsx` already uses.~~ **Done 2026-08-14** — see the resolved Edge cases finding below. `HomePage.tsx`'s identical unguarded lookup (`data[safeIndex].question`) was a separate instance of the same pattern; **also done 2026-08-16**, see the resolved Moderate edge-case finding below.
3. ~~Remove the module-scope hook calls and their eslint-disable in the two stores.~~ **Done 2026-08-16** — see the resolved High finding below.

---

## 1. Error handling

### ✅ Resolved 2026-08-16 — Unguarded `JSON.parse(localStorage)`, two copies ran before React even mounts
`src/stores/hardModeStore.ts:13-14` · `src/stores/onscreenKeyboardOnlyStore.ts:12-13` · `src/pages/HomePage.tsx:124, 147` (pre-fix line numbers)

Was: 4 call sites (not 5 as originally counted — `"theme"`/`"hardMode"`/`"onscreenKeyboardOnly"` are read as raw strings, never `JSON.parse`d) parsed `localStorage.getItem("prevGame")`/`"gameStats"` with no `try/catch`. The two in the stores ran at **module import time**, before the router's `errorElement` in `routes.tsx` existed to catch anything. One manually-edited or half-written value in `localStorage` threw a `SyntaxError` and the app failed to boot — a blank page, not the `ErrorPage` already built for exactly this situation.

Fixed by adding a shared `safeParse<T>(key, fallback)` helper (`src/utils/safeParse.ts`, new file) that try/catches around `localStorage.getItem` + `JSON.parse` and returns the fallback on any failure (missing key, empty string, or malformed JSON) — used at all 4 sites. Covered by `tests/utils/safeParse.test.ts` plus a malformed-JSON regression case added to each store's test file.

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

**Still open:** the broader "one shared hook" consolidation this finding originally suggested wasn't done. `HomePage.tsx`'s `data[safeIndex].question` lookup (see the resolved Moderate edge-case finding below) was the same pattern — now fixed too, but via a different mechanism (a guarded local variable, not a shared hook), so the consolidation itself remains undone.

### ✅ Resolved 2026-08-16 — `advancedStats[c]` assumed a fixed category set the type doesn't enforce
`src/data/questions.ts:1` · `src/pages/HomePage.tsx:300-323` (pre-fix line numbers)

Was: `Category` is typed as `"SCI" | "HIS" | "ART" | "REL" | "GEO" | "POP" | string` — the trailing `| string` means TypeScript accepts any category, but `advancedStats` was only ever initialized for the six fixed categories in `ALL_CATEGORIES`. Any custom/imported question with a different category made `advancedStats[c]` `undefined`, and the next line's `.questionsGuessedIn.map(...)` threw.

Confirmed during the fix that the `| string` escape hatch is genuinely in use — `src/stores/customQuestionsStore.ts`'s `defaultQuestions` assigns `category: "ANY"`, a value outside the 6-entry union — so narrowing `Category`'s type was ruled out as the fix (it would've required reworking the custom-question editor too). Instead, `statsStore.ts` gained two new actions, `recordCategoryGuess` and `finalizeCategoryAttempt`, which lazily initialize `advancedStats[category]` via `state.advancedStats?.[category] ?? emptyCategoryStat()` before updating it, so an unrecognized category is created on the fly instead of throwing. `HomePage.tsx`'s two direct-mutation call sites now call these actions instead (see the resolved Best Practices finding below — same fix covers both). Covered by `tests/stores/statsStore.test.ts`, including a case that calls both actions with `"ANY"` directly.

### ✅ Resolved 2026-08-16 — `indexOfLastGuess` could be -1 and silently mis-record a stat
`src/pages/HomePage.tsx:282-298` (pre-fix line numbers)

Was: for a question with zero submitted guesses, `allGuessesForQuestion.filter(...).length - 1` is `-1`. `todaysQuestionsGuessedIn[-1] += guessIncrease` doesn't throw (JS arrays accept string keys), it just creates a stray `"-1"` property instead of recording the stat anywhere real. Flagged as invisible while `QUESTIONS_PER_DAY` was 1, since the multi-question branch barely ran — but live code that mattered as soon as that changed.

Traced whether this is actually reachable via normal play: every question that transitions to `"won"`/`"lost"` does so from inside `onEnter`'s own flow, which always calls `makeGuess()` for that question in the same code path immediately after `winQuestion()`/`loseQuestion()` — so by the time the stats-reporting block runs, every finished question should already have ≥1 recorded guess, same invariant as Revision #1's retraction below, just not re-verified with the same rigor at the time. Fixed defensively anyway (skip when `guessIndex < 0`, per the original fix suggestion) rather than relying on that invariant staying true, directly motivated by `QUESTIONS_PER_DAY` moving from 1 to 3 on 2026-08-16 and this branch now actually running on every game.

### ✅ Resolved 2026-08-16 — HomePage's `data[safeIndex]` access had no bounds guard
`src/pages/HomePage.tsx:53-70` (pre-fix line numbers) — also covered a 7th access point at the old line 84 (`todaysCategories`) that this finding's original scope missed.

Was: `getPositiveIndex` wraps against the length of the local `questions` array (imported directly in `useDailyIndex.ts`), while `data` in `HomePage.tsx` comes from `useQuestions()`. Both resolved to the same array, so it was safe by coincidence — but the moment `useQuestions`' commented-out MongoDB path (see Documentation, below) comes back and `data` can have a different length or be temporarily empty, this would become an unguarded out-of-range read with no fallback, unlike the `?? ""` pattern used in `GameGrid.tsx`.

Fixed by introducing `const questionData = data[safeIndex];` and switching every subsequent `data[safeIndex].field` access (6 of them, plus the separate `todaysCategories` line) to `questionData?.field` with `?? ""` fallbacks matching `GameGrid.tsx`'s existing idiom. Kept as a direct guarded index rather than switching to `GameGrid.tsx`'s `useQuestionByID(safeIndex)` pattern, since `HomePage` already owns `data` from its own `useQuestions()` call and needs 5 distinct fields off one object — routing through `useQuestionByID` would mean a redundant second `useQuestions()` call plus its O(n) `.find()` scan (see the still-open Moderate finding below) for no benefit.

---

## 3. Best practices

### ✅ Resolved 2026-08-16 — React hooks called at module scope, with the lint rule disabled to allow it
`src/stores/hardModeStore.ts:11-12` · `src/stores/onscreenKeyboardOnlyStore.ts:10-11` (pre-fix line numbers)

Was: both files called `useDailyIndex()` at the top level of the module — not inside a component or a hook — behind `// eslint-disable-next-line react-hooks/rules-of-hooks`. It only worked because `useDailyIndex` happened not to call any real React hook internally (no `useState`/`useEffect`/`useContext`). That was an implementation detail of a function named like a hook, not a guarantee — the lint rule exists precisely to catch this, and disabling it hid the risk instead of removing it.

The freeze-per-session behavior itself (computing "today" once per page load, not re-evaluating as the clock ticks) was already correct and intentional — see Revision #2 below — so the fix only touched the mechanism. `useDailyIndex.ts`'s pure-arithmetic body was extracted into a new exported plain function `getDailyIndex()`; the `useDailyIndex` hook is now a one-line wrapper (`const useDailyIndex = (): number => getDailyIndex();`) so all 8 real component call sites keep working unchanged. Both stores now call `getDailyIndex()` directly at module scope, and the `eslint-disable-next-line` comment is gone from both. The stale `// 13 December 2023 Game Epoch` comment (see the Documentation finding below) was also fixed while touching this file. The two stores' duplicated `fromToday`/`pastGuesses` computation was **not** deduped into a shared helper — noted as a lower-priority cosmetic follow-up, not done here.

### ✅ Resolved 2026-08-14 — Keyboard's `getStatus` calls four hooks per key, 26 times per render
`src/components/keyboard/Keyboard.tsx:29-70, 140, 152, 174` (pre-fix line numbers)

Was: `getStatus(val)` was invoked once per rendered key — 26 times per render — and each call internally re-ran `useDailyIndex()`, two `useGameStateStore()` selectors, `useRetrievedStore()`, and `useQuestionByID()`, plus a couple of `.reduce()` passes over `guesses`. All 26 calls computed the exact same `answer`/`safeIndex`.

Fixed by hoisting the hook calls and derived `answer`/`guesses`/`questionNumber`/`guessNumber` to the top of `Keyboard`, and turning `getStatus` into a plain function that takes those as arguments instead of calling hooks itself. (This was also an actual `react-hooks/rules-of-hooks` lint violation — calling hooks from a non-component function — surfaced when CI was set up; see `CLAUDE.md`'s Known gotchas.)

**Still open:** `useQuestionByID`'s O(n) `.find()` instead of O(1) indexing (see the still-open Moderate finding below) — orthogonal to this fix, not addressed by it.

### ✅ Resolved 2026-08-16 — Store state mutated directly, bypassing Zustand's `set()`
`src/pages/HomePage.tsx:300-322` (pre-fix line numbers)

Was: `advancedStats[c] = { ...advancedStats[c], ... }` mutated the object returned from `useStatsStore()` in place, outside of any `set()` call. Every other update in the codebase went through immutable `set()` updates; this one silently broke that convention, so subscribers relying on reference-equality checks might not re-render, and the mutation happened outside Zustand's change-tracking entirely.

Fixed by adding two actions to `statsStore.ts` — `recordCategoryGuess(category, guessIndex, guessIncrease)` and `finalizeCategoryAttempt(category)` — matching the existing `importStats`/`logGame` convention of rebuilding state immutably inside `set()`. Two actions rather than one combined action, since they map 1:1 onto `HomePage.tsx`'s two existing loops over different data shapes. `HomePage.tsx`'s two direct-mutation blocks were replaced with calls to these actions; this is also where the fix for the `advancedStats[c]` fixed-category-set finding above lives (both actions lazily initialize a missing category instead of assuming the fixed 6). Covered by `tests/stores/statsStore.test.ts`.

### ✅ Resolved 2026-08-16 — `Array(n).fill([])` shared one array reference across every slot
`src/stores/gameStateStore.ts:29-32` (pre-fix line numbers)

Was: `Array(MAX_CHALLENGES).fill([])` filled every challenge slot with *the same* array instance, and `Array(QUESTIONS_PER_DAY).fill(Array(...))` did the same one level up. It was harmless while `QUESTIONS_PER_DAY` was 1 (and, per the code-path analysis, likely still harmless even at 3 — every update goes through `.map()`, which allocates fresh arrays rather than mutating the shared initial reference) — but a footgun not worth carrying once `QUESTIONS_PER_DAY` actually went above 1 on 2026-08-16.

Fixed by building both levels with `Array.from({ length }, () => ...)` so every question gets its own `guesses[i]` array and every challenge slot within it gets its own `[]`, instead of all sharing one instance. Covered by a new regression test in `tests/stores/gameStateStore.test.ts` asserting `guesses[0]`, `guesses[1]`, and `guesses[2]` are distinct references.

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

### 🟡 Partially resolved 2026-08-16 — Copy-pasted "Game Epoch" comment no longer matches the code
`src/hooks/useDailyIndex.ts:1, 5` · `src/hooks/useTodayAsInt.ts:1`

Was: both files open with `// 13 December 2023 Game Epoch`. In `useDailyIndex.ts`, the actual `firstGameDate` is `new Date(2024, 10, 22)` — 22 November 2024 — so the comment described a date the code no longer used. In `useTodayAsInt.ts` the comment is entirely unrelated to what that function does (it just formats today's date as a `YYYYMMDD` int).

`useDailyIndex.ts`'s comment fixed to `// 22 November 2024 Game Epoch` while touching that file for the module-scope-hooks fix above. **Still open:** `useTodayAsInt.ts`'s copy of the comment wasn't touched — that file wasn't part of this pass's scope.

### ✅ Resolved 2026-08-16 — README feature list didn't match the shipped config
`README.md:43` ("Three new questions every day") · `src/constants/settings.ts:2`

Was: `QUESTIONS_PER_DAY = 1`, not three. This wasn't just a stale doc — it also meant the multi-question code paths (the per-question stats loop and the `guesses` array-of-arrays in `gameStateStore.ts`) were effectively unexercised in production, which is exactly where the shared-array-reference and `-1`-index findings above were hiding.

Resolved the way this finding's own **Fix** suggested: `QUESTIONS_PER_DAY` bumped to 3 as a real feature, with both edge cases above fixed first (shared array reference, `indexOfLastGuess < 0`), plus a defensive guard added to `ProgressBar.tsx`'s previously-unguarded `data[...].category` access (same class of issue as the resolved `HomePage.tsx` finding above, now actually exercised since that loop runs 3x instead of 1x). README's line 43 needed no edit — it was already correct, just describing a feature that wasn't shipped yet.

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
- [x] A `safeParse`/localStorage round-trip test — `tests/utils/safeParse.test.ts` (missing key, empty string, valid JSON, malformed JSON), plus a malformed-JSON regression case added to `tests/stores/hardModeStore.test.ts` and `onscreenKeyboardOnlyStore.test.ts`.

Also added beyond this original list: `tests/components/progressBar/ProgressBar.test.tsx` and `tests/components/keyboard/Keyboard.test.tsx` (rendering, click handlers, and — via `Keyboard`'s letter-status coloring — an indirect check on the same success/warning/error classification `GameGrid.tsx` needs, using a real question's answer rather than `GameGrid` itself).

---

## Revisions

This report went through one round of author review. Two findings from the original draft were retracted after discussion — both are worth understanding if you're using this doc as a reference during the refactor, since they document real (if implicit) invariants in the current code:

1. **Retracted — "`moveToNextQuestion` sets `questionNumber` to -1 and crashes the keyboard."** Traced both call sites: `HomePage.tsx`'s `onEnter` only reaches `moveToNextQuestion()` in a branch that's unreachable unless `questionState.includes("inProgress")` is still true (the earlier `if (!questionState.includes("inProgress") || ...) { ...; return; }` guards it), and `ExpandableText.tsx`'s "Next Question" button gates on `gameState === "inProgress"`, which is only true before `winGame()`/`loseGame()` fire — and those only fire once no question remains in progress. So `indexOf("inProgress")` can't actually return -1 at either call site. Not reachable as originally reported.

2. **Retracted — "Hard-mode / onscreen-keyboard 'today' check only evaluates once, at page load."** This is intentional: a session started before midnight should keep its in-progress question and settings rather than switch out from under the player mid-guess. The freeze is achieved consistently app-wide via a module-scope `presentDate` constant in `useDailyIndex.ts` (evaluated once per page load, shared by every consumer). The remaining concern — flagged under Best Practices — is only that the freeze is implemented via a hook-named function called outside React with the relevant lint rule disabled, which is fragile, not that the freeze itself is wrong.

3. **Retracted — "Dead config key: `allowScripts` is not a real npm/Yarn setting."** This one wasn't caught by author pushback — it surfaced while actually doing the npm/yarn cleanup below. Running `npm install` produced `npm warn allow-scripts ... esbuild@0.25.12 (postinstall: node install.js) ... Run npm approve-scripts`. `allowScripts` is a real, currently-active npm 11 feature (npm's native answer to pnpm/yarn-Berry-style install-script gating) and it had correctly been gating `esbuild`'s postinstall script the whole time. The field was restored — scoped to just the still-real `esbuild@0.25.12` entry — via `npm approve-scripts esbuild`, rather than left removed. The lesson: a finding sourced from an automated review pass still needs independent verification before being reported as fact, same as any other finding.
