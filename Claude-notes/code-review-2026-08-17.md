# Triviale Code Review — 2026-08-17

A follow-up pass over the React + TypeScript daily-trivia app, covering the parts of `src/` the 2026-08-14 review didn't deeply touch — the landing page, most of the navbar (settings, stats, drawer, help), the custom-question editor, auth components, and six previously-unreviewed Zustand stores — plus a re-verification of everything the last pass fixed. For efficiency, best practices, edge cases, error handling, and documentation.

- **Scope:** `src/components/landingPage/`, `src/components/navbar/` (all subfolders), `src/components/question/` (incl. `custom/`), `src/components/auth/`, `src/pages/`, `src/hooks/`, `src/services/`, `src/data/`, `src/constants/`, `src/main.tsx`, `src/routes.tsx`, plus a fresh re-read of `src/stores/gameStateStore.ts`, `GameGrid.tsx`/`GameRow.tsx`/`Cell.tsx`, and `ProgressBar.tsx`
- **Not re-covered:** anything already itemized in [`code-review-2026-08-14.md`](./code-review-2026-08-14.md) that this pass didn't find new information about — that doc remains accurate and is not superseded, just extended
- **Reviewed at:** working tree HEAD (`a3d458b`), `main` up to date with `origin/main` (clean)
- **Method:** three parallel Explore passes over disjoint file sets, then independent manual verification of every High finding by directly reading the flagged files, plus a live browser reproduction of the top finding — this codebase's own review history logged a false-positive finding in the 08-14 pass (see its Revisions section), so nothing here was taken on an agent's word alone before being written down. This pass's own verification caught two of its own miscalibrations while the fixes were being implemented — see this doc's Revisions section at the bottom.

**Tally:** 7 High · 15 Moderate · 9 already-solid *(one originally-High finding was retracted on closer inspection — see Revisions)*. All 7 High and all 15 Moderate findings are now resolved as of 2026-08-17 (see each finding below for what changed).

---

## If you fix four things first

1. ~~**`ProgressBar.tsx`'s unhandled exception** — clicking the progress-bar tab for a question you just lost (or won on your last guess) throws an uncaught `TypeError` on every click.~~ **Done 2026-08-17** — see the resolved Edge cases finding below.
2. ~~**`GameGrid.tsx`'s skip-check bug** — a skipped guess renders as all-wrong instead of neutral.~~ **Done 2026-08-17** — see the resolved Edge cases finding below. (A second, loop-bound "bug" originally flagged alongside this one turned out not to be one on closer inspection — see Revisions.)
3. ~~**`GameRow.tsx`'s border-color operator-precedence bug** — hard mode's "accepted via addOn" green connecting-border cue could never actually render.~~ **Done 2026-08-17** — see the resolved High finding below.
4. ~~**The custom-question editor's stale-tab-switch bug** — switching which question you're editing without a full remount left stale field values on screen and could silently overwrite the wrong question's slot on save.~~ **Done 2026-08-17** — see the resolved High finding below.

---

## 1. Error handling

### ✅ Resolved 2026-08-17 — `EmailButton`'s `mailto:` body isn't URL-encoded
`src/components/navbar/settings/EmailButton.tsx:78`

The href interpolates `GAME_TITLE`, `text`, and `JSON.stringify(gameData)` directly — only line breaks are manually encoded (`%0D%0A`). `gameData` embeds question/answer/category text verbatim (plausible to contain `&`, `#`, `%`, or `+`, e.g. "Q&A"-style content), any of which truncates or corrupts the email's `subject`/`body` at that character with no error shown. `src/pages/UserProfilePage.tsx:35`'s delete-account mailto has the same gap, lower stakes (just `user?.email`, less likely to contain special characters, but still not spec-correct).

**Fixed by:** wrapping each interpolated segment (`GAME_TITLE`/`text` in the subject, `screenResolution`/`viewPortSize`/`timeZone`/`gameData` in the body) in `encodeURIComponent(...)` in both `EmailButton.tsx` and `UserProfilePage.tsx`'s delete-account link.

### ✅ Resolved 2026-08-17 — `prevGame` from `safeParse` is trusted for shape, not just parse-validity
`src/pages/HomePage.tsx:161-167`

```js
importGuess(
  pastGame.guesses[pastGame.questionNumber][
    pastGame.guessNumber[pastGame.questionNumber]
  ]
);
```

The 08-16 fix made `JSON.parse` failures safe via `safeParse`, but that only guards against malformed JSON — it does nothing if the value parses fine but has the wrong *shape* (hand-edited `localStorage`, or a future change to `MAX_CHALLENGES`/`QUESTIONS_PER_DAY` like the one that just landed). A mismatched shape throws a raw `TypeError` on page load, the exact failure mode `safeParse` was built to prevent, just one layer deeper.

**Fixed by:** bounds-checking before indexing — `pastGame.guesses?.[pastGame.questionNumber]?.[pastGame.guessNumber?.[pastGame.questionNumber]] ?? []`, same fallback idiom as the `ProgressBar.tsx` fix above.

### ✅ Resolved 2026-08-17 — Full Auth0 `user` object logged to console
`src/pages/UserProfilePage.tsx:19` (also a stray `console.log("Loading page")` at line 15)

Logs name, email, and picture URL to the browser console on every profile-page visit, with no dev-only gate.

**Fixed by:** removing the stray `"Loading page"` log entirely, and gating the `user` log behind `import.meta.env.DEV`.

---

## 2. Edge cases

### ✅ Resolved 2026-08-17 — `ProgressBar`'s tab click throws an unhandled exception on a just-finished question
`src/components/progressBar/ProgressBar.tsx:41`

```js
onClick={() => {
  moveToQuestion(i);
  importGuess(guesses[i][guessNumber[i]]);
}}
```

`guesses[i]` always has exactly `MAX_CHALLENGES` (5) slots, indices 0–4. `makeGuess` (`src/stores/gameStateStore.ts:67-84`) unconditionally increments `guessNumber[questionNumber]` on *every* submitted guess — including the guess that triggers `loseQuestion` (`HomePage.tsx:253-264` checks `guessNumber[questionNumber] >= MAX_CHALLENGES - 1` *before* the `makeGuess(guess)` call two lines later still runs), and including winning on the 5th/last guess. So `guessNumber[i]` reaches `5` via completely normal play — lose any question, or win one on your last try. None of the progress-bar buttons are `disabled` for finished questions, so clicking that question's tab afterward evaluates `guesses[i][5]` → `undefined`, then `importGuess(undefined)` does `cachedGuess.length` (`src/stores/currGuessStore.ts:28`) and throws.

**Reproduced live in Chrome** (lost a question via 5 wrong guesses, then clicked its own tab): the browser console shows the exact predicted stack trace (`TypeError: Cannot read properties of undefined (reading 'length')` at `currGuessStore.ts:15` ← `importGuess` ← `onClick` in `ProgressBar.tsx:41`). Importantly, **this is not an app crash** — React contains errors thrown inside event handlers to that single dispatch (unlike a render-phase error, which is what the router's `errorElement` actually exists to catch), so the page keeps working normally afterward; navigating to another tab immediately after triggering it worked fine in testing. The real effect is narrower: `moveToQuestion(i)` (a separate store) already succeeded before the throw, but `importGuess`'s `set()` call never applies, so `currGuessStore`'s `guess`/`index` are left unchanged rather than synced to the newly-selected question. In practice this has **no observed visible symptom** — `GameGrid` never renders a "current guess" input row for an already-finished question in the first place (no guess-slot index matches an out-of-range `guessNumber`), so the stale, unsynced value isn't displayed against anything, and it gets correctly overwritten the next time any still-in-progress tab is clicked (which calls `importGuess` with a valid array). `tests/components/progressBar/ProgressBar.test.tsx` only exercises an in-progress question at `guessNumber`'s default (0), so this exception isn't caught by the suite — worth adding a regression test even without a visible-UI assertion, since a silently-thrown exception is itself the defect (and would show up in any error-tracking tool wired up later, e.g. Sentry).

**Fixed by:** `importGuess(guesses[i][guessNumber[i]] ?? [])` in `ProgressBar.tsx:41`.

### ✅ Resolved 2026-08-20 — Same file's render body had the same unguarded-shape gap, one layer deeper than the click-handler fix above
`src/components/progressBar/ProgressBar.tsx:47` (pre-fix)

Surfaced while writing `tests/pages/HomePage.persistence.test.tsx` (see the [test coverage plan](./test-coverage-plan-2026-08-20.md)): the click-handler fix above only guards `guesses[i][guessNumber[i]]` being out of range *within* a well-formed `guesses[i]` array. It doesn't guard `guesses[i]` itself being `undefined` — which happens if `prevGame.guesses` from `localStorage` is shorter than `QUESTIONS_PER_DAY` (same shape-mismatch class as the already-fixed `HomePage.tsx:161-167` finding two sections up, just never chased into this file). `guesses[i].reduce(...)` in the render body (the "has this question been started yet" warning-color check) then throws unconditionally for every render of that question's button — and unlike the click-handler version, **this is a render-phase error**, so the router's `errorElement` actually does catch it: a malformed `prevGame` blob doesn't just glitch one click, it takes the whole page to the error screen on load. `importGame` (`gameStateStore.ts`) writes whatever shape `safeParse` hands it straight into state with no validation, so nothing upstream currently prevents this.

**Fixed by:** `(guesses[i] ?? []).reduce(...)` in the render body, plus hardening the click handler from `guesses[i][guessNumber[i]] ?? []` to `guesses[i]?.[guessNumber[i]] ?? []` so it no longer shares the same gap. Covered by a new case in `tests/components/progressBar/ProgressBar.test.tsx` seeding `guesses: [["a"]]` (shorter than `QUESTIONS_PER_DAY`) and asserting neither render nor a click on the missing question's tab throws — verified live by reverting the render-body guard and confirming the test fails with the exact predicted `TypeError` before restoring the fix.

### ✅ Resolved 2026-08-17 — `GameGrid`'s skip-check tests the wrong constant, so it never fires
`src/components/grid/GameGrid.tsx:31`

```js
if (guess.includes(SKIPPED_TEXT)) {
  return; // Don't compute if the guess was skipped.
}
```

`SKIPPED_TEXT` is `"skipped"` (`src/constants/strings.ts:78`) — a human-readable label used only for `aria` text (`Cell.tsx:67`). Actual skipped guesses are filled with `SKIP_LETTER` (`"-"`, same file, line 77) — see `ExpandableText.tsx:83,85` (`makeGuess(Array(...).fill(SKIP_LETTER))`), and `StatsDialog.tsx:99` correctly checks `g.includes(SKIP_LETTER)` for the identical purpose. A guess array never literally contains the string `"skipped"`, so this condition is always `false` — dead code. A skipped turn instead runs the full correct/present/absent algorithm against literal `"-"` characters, producing an all-wrong (red) row instead of the intended neutral rendering.

**Fixed by:** `guess.includes(SKIP_LETTER)` (and the import) in `GameGrid.tsx`.

### ⚪ Retracted — `GameGrid`'s "set correct chars" loop bound was not actually the bug (see Revisions)
`src/components/grid/GameGrid.tsx:46`

Originally written up as a High-severity loop-bound bug with a one-line fix (`i < answer.length` → `i < guess.length`). Implementing that fix and tracing it through before shipping it showed it changes nothing: `answerArr[i]` is `undefined` for any `i >= answer.length`, and a real guessed letter can never `===` `undefined`, so the `if` branch this loop guards could never fire past `answer.length` under the *original* bound either — the original bound already covered every position where a match was structurally possible, in both the too-short and too-long cases. Reverted the code change; a comment now documents the real limitation in place of the code (see `GameGrid.tsx:66-72`).

The concrete symptom that prompted this finding is real (a hard-mode guess accepted via a *prefix* addOn — e.g. `"PabloPicasso"` for `"Picasso"` — never gets per-letter green cells for its `"Picasso"` portion) — it's just not caused by a loop bound. This algorithm compares `guess[i]` to `answerArr[i]` with no positional offset, so a prefix addOn shifts every real-answer letter to the wrong index; a *suffix* addOn (`answer + addOn`) happens to align correctly already and was never broken. Fixing the prefix case for real needs actual alignment logic (locate which addOn, if any, prefixes the guess, then offset the comparison) — a small feature, not a line fix, and out of scope for this pass since the affected code path is still dormant (no shipped question has `addOns`). The whole-guess acceptance (green connecting border via `getBorderColorOverrides`) already works correctly for both prefix and suffix forms regardless of this — only the *per-letter* coloring is affected.

This is the "currently contains real bugs" item the 08-14 review flagged in `GameGrid.tsx` without itemizing — the skip-check bug above is the one that itemizing turned out to confirm; this loop-bound half of it didn't hold up. Zero test coverage exists for this file.

### ✅ Resolved 2026-08-17 — `GameRow`'s border color silently drops its override due to operator precedence
`src/components/grid/GameRow.tsx:90-101`

```js
borderColor:
  borderColorOverride ||
  (statuses[i] === theme.palette.success &&
    statuses[i + 1] === theme.palette.success)
    ? statuses[i].main
    : !answerOverride && (...) ? "primary.darker" : "primary.light",
```

`||` binds tighter than `?:`, so this parses as `(borderColorOverride || cond1) ? statuses[i].main : (...)`. Whenever `borderColorOverride` is truthy, it's used only as a boolean trigger for the ternary and then discarded — the branch always renders `statuses[i].main`, never the override color itself. Contrast with the correct idiom one line earlier in the same component (`borderColorOverride={borderColorOverride}` passed straight to `Cell`, line 75) and in `Cell.tsx:80-82` (`borderColorOverride || (value ? "primary.light" : "primary.darker")`, no trailing ternary after the `||`). Net effect: hard mode's "this guess was accepted via an addOn/alternate spelling" green connecting-border cue silently fails to render, falling back to per-letter `statuses` — which, per the finding above, is frequently not `success` for addOn-aligned guesses anyway. No test coverage exists for this file.

**Fixed by:** wrapping the whole ternary chain in parens after `||`, so `borderColorOverride` short-circuits it instead of only gating it.

### ✅ Resolved 2026-08-17 — Custom-question editor loses/overwrites data when switching tabs mid-edit
`src/components/question/custom/CustomizableText.tsx` (rendered at `HomePage.tsx:197`, no `key`) + `QuestionInputForm.tsx:48-50` + `QuestionInputFormMulti.tsx:47-50`

`useForm`'s `defaultValues: customQuestions[questionNumber]` and each field's `useState(defaultValue...)` only capture data at mount. `ProgressBar.tsx:39-41`'s tab buttons call `moveToQuestion(i)` at any time, including while `editing` is true — `ProgressBar` renders unconditionally (`HomePage.tsx:181` is outside the `!editing` guard). Switching tabs while editing leaves every field showing the stale, previously-loaded question's text (only the `label` prop updates live), and saving then overwrites the *newly selected* question's slot with the *old* question's content via `setQuestion(data, questionNumber)`.

**Fixed by:** `<CustomizableText key={questionNumber} />` in `HomePage.tsx` — forces a full remount (and thus fresh `defaultValues`/`useState` init) on every tab switch, rather than threading a `reset()` call through three form components.

### ✅ Resolved 2026-08-17 — `QuestionInputFormMulti`'s option chips show only one letter
`src/components/question/custom/QuestionInputFormMulti.tsx:67-69`

```js
getOptionLabel={(option) => {
  return option[0];
}}
```

Indexes into the option *string* rather than returning it — `"Roosevelt"` renders as `"R"`. The correct sibling, `QuestionInputForm.tsx:68-70`, returns `option` directly. Every chip for a custom question's alt-answers shows a single character. (Both files also internally name their component `QuestionInputForm`, not `...Multi` — harmless but confusing in React DevTools or a codebase search; worth renaming while fixing this.)

**Fixed by:** `getOptionLabel={(option) => option}`; also renamed the file's internal component/props-interface from `QuestionInputForm`/`QuestionInputFormProps` to `QuestionInputFormMulti`/`QuestionInputFormMultiProps` while in there, per the bonus finding above.

### ✅ Resolved 2026-08-17 — `AdvancedStats` reads `advancedStats[c]` with no fallback, unlike its own write side
`src/components/navbar/stats/AdvancedStats.tsx:46, 55-66`

The 08-16 fix added `recordCategoryGuess`/`finalizeCategoryAttempt` to `statsStore.ts`, both of which guard with `state.advancedStats?.[category] ?? emptyCategoryStat()` before writing — but `importStats` (`statsStore.ts:55-62`, called from `HomePage.tsx:141` with `pastStats["advancedStats"]` straight from `localStorage`'s `"gameStats"`) *replaces* `advancedStats` wholesale rather than merging. An imported blob missing one of the current `ALL_CATEGORIES` keys (stats saved before a category was added/renamed, or hand-edited storage) makes `advancedStats[c]` `undefined` for that category, and opening "Advanced Stats" throws immediately — the same failure class the write-side fix addressed, just on the read path.

**Fixed by:** the second option — `importStats` (`statsStore.ts`) now spreads `{...state.advancedStats, ...pastStore.advancedStats}` instead of assigning `pastStore.advancedStats` outright, so every current category keeps a default entry and only gets overridden where the import actually has data. Chosen over guarding the read site in `AdvancedStats.tsx` because it fixes the shared root cause once for every current and future reader of `advancedStats`, rather than requiring each new consumer to remember its own guard.

### ✅ Resolved 2026-08-17 — `customQuestionsStore.removeQuestion`'s filter is inverted
`src/stores/customQuestionsStore.ts:37-40`

```js
removeQuestion: (index) =>
  set((store) => ({
    customQuestions: store.customQuestions.filter((_, i) => i === index),
  })),
```

`i === index` *keeps only* the targeted question and deletes every other one — the opposite of "remove." Currently unreachable (no call sites anywhere in `src/`), so it's a landmine rather than a live bug, but it will silently destroy every other custom question the moment a "delete question" UI action gets wired to it. No test file exists for this store.

**Fixed by:** `filter((_, i) => i !== index)`.

### ✅ Resolved 2026-08-17 — Hard mode has no minimum-guess-length guard
`src/pages/HomePage.tsx:241`

```js
if (index === answer.length || hardMode) { ... }
```

Normal mode blocks submission until the guess is exactly the right length; hard mode bypasses that check entirely with no replacement, so pressing Enter with zero letters typed still runs the full comparison/lose-check/`makeGuess`/`resetGuess` path — silently burning one of `MAX_CHALLENGES` guesses. Corroborating: `NOT_ENOUGH_LETTERS_MESSAGE` and its siblings (`constants/strings.ts:65` area) are defined but never referenced anywhere in `src/` — this validation looks planned and never wired in.

**Fixed by:** `index === answer.length || (hardMode && index > 0)`. Deliberately *not* wired to `NOT_ENOUGH_LETTERS_MESSAGE` — normal mode already has the identical silent-no-op UX today when `index !== answer.length` (nothing renders, no toast infrastructure exists anywhere in gameplay), so this keeps hard mode consistent with that existing behavior rather than introducing new toast/Snackbar machinery for just this one case. Wiring an actual message remains open if that inconsistency (silent no-op vs. an explicit message) is worth addressing later.

### ✅ Resolved 2026-08-17 — Triplicated `permutationsWithAddons` logic never generates the prefix-only accepted answer
`src/pages/HomePage.tsx:62-65`, `src/components/grid/GameGrid.tsx:76-78`, `src/components/navbar/stats/StatsDialog.tsx:53-58`

All three independently repeat:
```js
[[], ...(question?.addOns || []), []].flatMap(
  (d) => question?.addOns?.map((v) => d + answer + v) || []
)
```
Verified against real data in `src/data/pastQuestions.txt` (e.g. `answer: "Picasso", addOns: ["Pablo"]`, intended accepted form `"PabloPicasso"`): this only ever produces `answer+addOn` (suffix) and `addOn+answer+addOn` (nonsense double-glue) — it never produces `addOn+answer` alone (prefix-only), because `v` is always sourced from `addOns` and never has an empty/no-suffix option. The leading/trailing `[]` sentinels cover the "no-prefix" case redundantly (both produce the same result) rather than covering "no-suffix." Currently **dormant** — no entry in the live `src/data/questions.ts` has an `addOns` field — but `pastQuestions.txt` has ~15 prefix-style `addOns` entries staged for rotation in, at which point correct prefix-form guesses in hard mode would be silently rejected.

**Fixed by:** extracting a single `getAcceptableAnswers(question, answer)` helper (new file, `src/utils/acceptableAnswers.ts`) used by all three call sites, building the accepted set explicitly as `{addOn+answer}`, `{answer+addOn}`, and `{addOn+answer+addOn}` per addOn — covering the prefix-only case the old cartesian product missed. Covered by `tests/utils/acceptableAnswers.test.ts`, including a case pinning down the prefix-only acceptance.

---

## 3. Best practices

### ✅ Resolved 2026-08-17 — `EmailButton`'s screen-resolution fields are swapped
`src/components/navbar/settings/EmailButton.tsx:20-21`

```js
const deviceWidth = window.screen.height;
const deviceHeight = window.screen.width;
```

Every feedback/bug-report email reports width and height transposed. **Fixed by:** swapping the two assignments.

### ✅ Resolved 2026-08-17 — `<Analytics mode="production" />` is hardcoded in `main.tsx`
`src/main.tsx:17`

Per `@vercel/analytics`'s docs, `mode: "production"` means "always use the production script, sends events to the server," vs. the default `"auto"`, which detects dev and uses a console-log path instead. Hardcoding `"production"` means every `npm run dev` session sends real page-view events into the live analytics dataset.

**Fixed by:** dropping the `mode` prop entirely (defaults to `"auto"`).

### ✅ Resolved 2026-08-17 — No environment-variable mechanism exists at all
`src/pages/Layout.tsx:31-32` (Auth0 `domain`/`clientId` literals) · `src/services/api-client.ts:4` (Mongo base URL literal)

The 08-14 doc's still-open "README omits env var setup" finding undersells this: `grep -rn "import.meta.env" src` returns zero matches, and no `.env*` file exists anywhere in the repo. There is currently no way to point a local/staging build at a different Auth0 tenant or API endpoint without editing source — this isn't a docs gap on top of working config, it's that the config mechanism itself was never built. `src/vite-env.d.ts` also has no `ImportMetaEnv` augmentation, which fixing this would need.

**Fixed by:** adding an `ImportMetaEnv` interface (`VITE_AUTH0_DOMAIN`/`VITE_AUTH0_CLIENT_ID`/`VITE_API_BASE_URL`) to `vite-env.d.ts`, reading each via `import.meta.env.VITE_* ?? <existing hardcoded value>` in `Layout.tsx`/`api-client.ts`, and adding `.env.example` plus a Setup note in the README. Chose a fallback-to-current-value default over making the vars required, specifically to preserve the "no env vars needed, `npm install && npm run dev` just works" zero-config property this project already has (documented in `CLAUDE.md`) — requiring the vars would also break CI, which has no `.env` and no secrets configured for these (non-secret) values.

### ✅ Resolved 2026-08-17 — `statsStore`'s `finalizeCategoryAttempt` computes `changedToday` from cumulative data
`src/stores/statsStore.ts:98`

```js
changedToday: existing.questionsGuessedIn.map((v) => v > 0),
```

Unlike the correct top-level pattern (`HomePage.tsx:313`: `changedToday: todaysQuestionsGuessedIn.map((v) => v > 0)`, derived from a today-only local counter), this per-category version derives `changedToday` from `existing.questionsGuessedIn` — the same field the action mutates cumulatively across every day, never reset per session. Once any guess-bucket has ever been hit for a category, `changedToday[i]` is permanently `true`, contradicting the field's name. New code from the 08-16 fix, so not previously tracked. Currently low-impact — `AdvancedStats.tsx` never reads this field — but a landmine for whoever wires up a per-category "today" indicator next.

**Fixed by:** `finalizeCategoryAttempt` now takes a second `todayGuessedIn: number[]` argument and derives `changedToday` from that instead of `existing.questionsGuessedIn`. `HomePage.tsx` builds this per-category, today-only counter (`todaysCategoryGuessedIn`) alongside the existing top-level `todaysQuestionsGuessedIn`, in the same `indexOfLastGuess.forEach` loop, and passes the right slice to each `finalizeCategoryAttempt` call. `tests/stores/statsStore.test.ts`'s existing test for this action didn't actually exercise the bug (it never populated a non-today `questionsGuessedIn` bucket) — updated to record a guess at index 0 (simulating a prior day) alongside today's index-2 guess, confirming `changedToday[0]` stays `false`.

### ✅ Resolved 2026-08-17 — `customQuestionsStore`'s `defaultQuestions` is a shared reference, same class as an already-fixed bug
`src/stores/customQuestionsStore.ts:49, 51`

Both the store's initial state (`customQuestions: defaultQuestions`) and `resetQuestions()` point directly at the module-level `defaultQuestions` array and its object literals, rather than cloning — the exact pattern the 08-14 review found and fixed in `gameStateStore.ts`'s `Array(n).fill([])` (now `Array.from(...)`). No live mutation path exists today (`setQuestion`/`addQuestion` are immutable via `.map()`/spread), so this is latent, not actively broken.

**Fixed by:** `structuredClone(defaultQuestions)` at both call sites. Covered by a new regression test in `tests/stores/customQuestionsStore.test.ts` asserting neither the initial state nor a post-`resetQuestions()` state share references with `defaultQuestions`.

### ✅ Resolved 2026-08-17 — Two aria-label bugs in navbar buttons
`src/components/navbar/stats/StatsButton.tsx:12` · `src/components/question/EditingButton.tsx:18, 29`

`StatsButton`'s `aria-label="help"` is hardcoded and duplicates `HelpButton`'s value, misidentifying this Stats-opening button to assistive tech (every sibling button uses a dedicated `*_ARIA` constant). `EditingButton`'s `aria-label={editing ? EDIT_BUTTON_ARIA : RETURN_FROM_EDIT_BUTTON_ARIA}` is inverted relative to its own visible text (`"Stop editing questions"` / `"Edit quesitons"` — also a typo, and hardcoded rather than pulled from `constants/strings.ts` like every other user-facing string in the app).

**Fixed by:** adding a `STATS_BUTTON_ARIA` constant and using it in `StatsButton.tsx`; swapping `EditingButton`'s aria-label ternary branches to match its actual behavior; and adding `EDIT_BUTTON_TEXT`/`RETURN_FROM_EDIT_BUTTON_TEXT` constants (fixing the "quesitons" typo) used for both the visible label and the same ternary ordering as the aria-label.

### ✅ Resolved 2026-08-17 — `AdvancedStats` renders two lists with no usable `key`
`src/components/navbar/stats/AdvancedStats.tsx:34-38, 39-72`

The first `Grid item` `.map()` (34-38) passes no `key` at all; the second (39-72) wraps 3 `Grid item`s in a shorthand `<>` fragment that can't carry one either. Triggers React's missing-key warning on every render.

**Fixed by:** `key={s}` on the first map; `<Fragment key={c}>` (imported from `react`) instead of `<>` on the second.

### ✅ Resolved 2026-08-17 — Stray global flag on a validation regex causes intermittent flakiness
`src/components/question/custom/QuestionInputFormMulti.tsx:97`

The alt-answers `pattern` is `/^[a-zA-Z ]*$/g` — unlike the otherwise-identical `QuestionInputForm.tsx:106` (`/^[a-zA-Z ]*$/`, no `g`). A global regex retains `lastIndex` across `.test()` calls, so repeated validation of the same value can alternately pass and fail.

**Fixed by:** dropping the `g` flag.

### ✅ Resolved 2026-08-17 — Dead `e.persist()` call masks an unverified original fix
`src/components/question/custom/CustomizableText.tsx:41-43`

`<form onChange={(e) => e.persist()}>` calls a no-op — React 17+ removed event pooling (this app is on React 18). The comment above it ("hacky solution that allows last letter changed to be submitted") describes a workaround that no longer does anything, so whatever it was compensating for may be unaddressed.

**Fixed by:** removing the dead `onChange` handler entirely (it did nothing besides call the no-op). Re-verified first: since `e.persist()` has been inert since React 17, this handler was already functionally identical to not having one at all, so removing it is a zero-behavior-change cleanup, not a risk to the original "last letter dropped" fix (which, if still needed, was never actually provided by this line to begin with).

### ✅ Resolved 2026-08-17 — Misnamed component: file, component name, and behavior are three different things
`src/components/landingPage/ShareLandingButton.tsx`

The file is `ShareLandingButton.tsx`, but the component and its props interface are both named `PlayLandingButton`/`PlayLandingButtonProps` — identical to the actual `PlayLandingButton.tsx` — and its real behavior is opening the Stats dialog, not sharing or playing.

**Fixed by:** renaming the component/interface to `OpenStatsLandingButton`/`OpenStatsLandingButtonProps` (file left as `ShareLandingButton.tsx`, and its import in `LandingButtons.tsx` unchanged, since default exports don't need the local import name to match).

---

## 4. Documentation completeness

*(No new findings beyond what's covered above and already tracked in the 08-14 doc — see that doc's still-open items on persisted-state shape docs and the duplicated `getPositiveIndex` expression, both of which remain accurate.)*

---

## 5. Efficiency

Not a separate root cause list this pass either — same as the 08-14 doc's conclusion, the correctness bugs above (`GameGrid`'s loop bounds, the triplicated `permutationsWithAddons`/"hasn't started playing" computations) are also the efficiency fix once addressed. Two small standalone items:

- Several navbar/landing components destructure the entire Zustand store instead of using per-field selectors (`LandingButtons.tsx:19`, `EmailButton.tsx:31-32`, `HardModeSwitch.tsx:14`, `AdvancedStats.tsx:16`, `PastGamesStats.tsx:13`, `GuessDistribution.tsx:25`), causing re-renders on unrelated state changes — inconsistent with the selector pattern used correctly elsewhere in the same files.
- `ExpandableText.tsx:44`'s random win-message index is recomputed directly in the render body, unmemoized — any unrelated re-render while the win/lose screen shows re-rolls the message.

---

## What's already solid

- `CustomDialog.tsx` is a clean, well-parameterized shared abstraction (consistent close button, aria props, transition) reused across all 4 dialogs.
- `ExpandableText.tsx` calls every hook unconditionally before its early return — correctly respects rules-of-hooks.
- `PastGamesStats.tsx` and `GuessDistribution.tsx` both guard divide-by-zero with `Math.max(..., 1)`.
- `ProgressBar.tsx`'s existing `data[...]?.category ?? ""` guard (unrelated to its click-handler exception above) is present and correct.
- The three previously-unreviewed stores `dialogStore.ts`, `editingStore.ts`, `retrievedStore.ts` are small, correct, idiomatic Zustand — no defects found.
- `highContrastStore.ts` correctly reads its raw-string localStorage key without needing the `safeParse` treatment (consistent with the existing `"theme"`/`"hardMode"`/`"onscreenKeyboardOnly"` convention).
- `ThemedLayout.tsx`'s theme-preference detection (`localStorage` → `prefers-color-scheme` → light default) is defensively written, with correctly-scoped `useMemo`s.
- The 08-16 fixes hold up under re-verification: `gameStateStore.ts`'s shared-array-reference fix (`Array.from`) and `useDailyIndex.ts`'s `getDailyIndex()` module-scope extraction both work as intended, nothing new found in either.
- `HomePage.tsx`'s guarded `questionData?.field ?? ""` pattern from the 08-16 fix is applied consistently throughout the file; no new unguarded `data[safeIndex]` accesses were introduced in the QUESTIONS_PER_DAY rework.

---

## Suggested test targets

Zero test files exist for:

- [x] `src/stores/currGuessStore.ts` — `tests/stores/currGuessStore.test.ts`, added 2026-08-20 (see [test-coverage-plan-2026-08-20.md](./test-coverage-plan-2026-08-20.md)). Pins the `deleteChar`-on-empty-guess `Math.max(0, -1)` clamp and `importGuess([])`'s `{[], 0}` result — the exact input `ProgressBar.tsx`'s `?? []` guard feeds it.
- [x] `src/stores/customQuestionsStore.ts` — `tests/stores/customQuestionsStore.test.ts`, added alongside the `removeQuestion` inversion fix; now also covers the `structuredClone` shared-reference fix
- [x] `src/stores/dialogStore.ts` — `tests/stores/dialogStore.test.ts`, added 2026-08-20. Pins the `isLandingOpen: true` initial-state default (load-bearing for `routing.test.tsx`), per-flag isolation, and `closeAllDialogs`.
- [x] `src/stores/editingStore.ts` — `tests/stores/editingStore.test.ts`, added 2026-08-20.
- [x] `src/stores/highContrastStore.ts` — `tests/stores/highContrastStore.test.ts`, added 2026-08-20. Covers the module-load `localStorage` init (via the `vi.resetModules()` pattern from `hardModeStore.test.ts`) and persistence on toggle.
- [x] `src/stores/retrievedStore.ts` — `tests/stores/retrievedStore.test.ts`, added 2026-08-20.
- [x] `src/components/grid/GameGrid.tsx` — `tests/components/grid/GameGrid.test.tsx`, added 2026-08-19. Chose render-based testing over the extract-to-pure-function refactor both this doc and the 08-14 doc deferred — kept in scope as "add tests," no production-code change, consistent with how `Keyboard.test.tsx` already covers the identical class of logic. Covers the `SKIP_LETTER` short-circuit and the correct/warning/error classification, plus a hard-mode addOn-acceptance case (needs a mocked question, since no real data has `addOns` — done by replacing `questions[1]` via `vi.mock` on `src/data/questions`, not the `useQuestionByID` hook, so every other test in the file keeps using real `questions[0]` data unaffected). Both regression cases were verified live: temporarily reintroducing each historical bug (wrong constant; missing parens) makes the corresponding new test fail, confirming they actually pin the defects rather than passing vacuously.
- [x] `src/components/grid/GameRow.tsx` — `tests/components/grid/GameRow.test.tsx`, added 2026-08-19 alongside the above. The border-color precedence regression is actually asserted from the `GameGrid` test (comparing a cell's and its divider's computed `border-color`, since `.className` checks don't apply here — `Cell.tsx` sets color via raw `sx`, not MUI's `color` prop, unlike `Key.tsx`). `GameRow.test.tsx` itself covers the `answerOverride` prop (bypasses question lookup — used by the help dialog) and the previously-undocumented, previously-untested `offsetFromPrevSkipped`/`shouldSkip` space-boundary gap logic.
- [x] `src/components/grid/Cell.tsx` — `tests/components/grid/Cell.test.tsx`, added 2026-08-19. Covers the aria-label construction (status text, skipped-letter label, ordinal suffixes including the `11th`/`12th`/`13th` guard clauses) and the `borderColorOverride` vs. plain-status border rendering.
- [x] `src/components/ThemedLayout.tsx` — `tests/components/ThemedLayout.test.tsx`, added 2026-08-20. Covers the `localStorage` → `prefers-color-scheme` → light-default detection chain, `toggleColorMode` persistence, and the `highContrastStore`-driven colorblind palette swap.

Partial coverage, worth extending:

- [x] `tests/components/progressBar/ProgressBar.test.tsx` — added a case exercising a finished/lost question (`guessNumber[i] === MAX_CHALLENGES`), pinning down the `ProgressBar` click-handler fix. 2026-08-20: also added a case for a shape-mismatched `guesses` array shorter than `QUESTIONS_PER_DAY`, pinning the render-body fix in the finding directly above this section.
- [x] `tests/stores/statsStore.test.ts` — now covers `finalizeCategoryAttempt`'s `changedToday` computation, including a case that would have caught the cumulative-vs-today-only bug (a prior-day guess at a different index no longer leaks into `changedToday`).
- [ ] `src/components/keyboard/Key.tsx` is only exercised indirectly via `Keyboard.test.tsx`, not in isolation. Deliberately deprioritized in the 2026-08-20 test coverage plan — its indirect coverage already yields 100% lines, so an isolation suite would mostly re-assert what `Keyboard.test.tsx` proves.

---

## Lower-priority items (not detailed above)

- `HamburgerDrawer.tsx:45` — `height: "200"` is an invalid unitless string (unlike `width: 250`, a number MUI auto-suffixes); drop the quotes.
- `GuessDistribution.tsx:54-55` — stray `key` props on elements that aren't the one actually being mapped.
- `LandingButton.tsx:9` — dead commented-out prop type.
- `StatsDialog.tsx:34` — no-op `declare const window: Window;` redeclaration; `:44,126-143` — share-text date isn't pulled from the app's shared frozen-"today" source, and the Windows exclusion from `navigator.share` has no explaining comment.
- `Key.tsx:31-39` — `handleClick` closes over a store value defined later in the same component body; safe at runtime, but would trip `no-use-before-define`.
- `currGuessStore.ts:18` — redundant array spread around an already-new `.filter()` result.
- `GameRow.tsx` — the `offsetFromPrevSkipped`/`prevLean` space-gap algorithm has no comment explaining what it does or why; same documentation gap as the already-tracked `getPositiveIndex` duplication.
- `GameGrid.tsx:21` / `GameRow.tsx:43` — leftover non-null assertions on `.replace()` results, which can never be `undefined`; harmless but misleading.
- `main.tsx:2, 15` — `ReactQueryDevtools` is unconditionally imported and rendered rather than gated behind `import.meta.env.DEV`, shipping devtools code into the production bundle.
- `data/questions.ts:110` — broken source URL missing the `h` in `https`; `:164` — a leftover `http://localhost:5173/` used as a question's source link; `:~201` — stray typo "tenname" in flavor text.
- `routes.tsx:15` — the `login/callback` route looks unreachable given `Layout.tsx`'s `Auth0Provider` always sets `redirect_uri` to the origin — low confidence, may be configured out-of-band in the Auth0 dashboard.
- `PrivateRoutes.tsx:18` — `withAuthenticationRequired` has no `onRedirecting` fallback, so an unauthenticated visit to `/profile` renders a blank page during the redirect check.
- `UserProfilePage.tsx:22` — `alignItems={"left"}` isn't a valid CSS `align-items` value (only valid for `justify-content`/`text-align`); falls back to default `stretch`. `:27-28` — `img alt={user?.name}` omits the `alt` attribute entirely if `user?.name` is `undefined`, worse for accessibility than an explicit empty string.

---

## Revisions

This doc went through two self-corrections while its High findings were being fixed, in the same spirit as the 08-14 doc's own Revisions section — worth reading if you're relying on this doc as a map for what actually needs fixing.

1. **Downgraded — `ProgressBar.tsx`'s finding was originally written up as "Critical" / a crash.** A live reproduction in Chrome (losing a question, then clicking its own progress-bar tab) confirmed the exception fires exactly as predicted, but also showed the app keeps working normally afterward — React contains an error thrown inside an event handler to that one dispatch; it doesn't unmount or break rendering the way a render-phase error would (which is specifically what the router's `errorElement` exists to catch, and specifically why it never fires here). Downgraded to High and rewritten to describe the real, narrower effect: `currGuessStore`'s state update silently aborts, with no observed visible symptom in normal play. Still fixed with the originally-proposed one-line guard, since an unhandled exception on an ordinary click is a real defect regardless of visible symptom.
2. **Retracted — `GameGrid.tsx`'s "loop bounded by the wrong array's length" finding.** Written up as a second High-severity bug alongside the (real, confirmed) skip-check bug, with a proposed one-line fix (bound the loop by `guess.length` instead of `answer.length`). Implementing and tracing that fix before shipping it showed it changes nothing: a real guessed letter can never equal the `undefined` you get from indexing `answerArr` past `answer.length`, so the original bound already covered every position where a match was structurally possible — in both the too-short and too-long guess cases. The code was reverted to its original bound; a comment now documents the real, harder limitation this finding was actually pointing at (per-letter coloring has no positional offset logic, so a *prefix*-style addOn guess can't align to the real answer — a design gap, not a line fix, and not attempted here since the affected path is still dormant in production).
