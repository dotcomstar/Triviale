# Triviale Test Coverage Plan — 2026-08-20

A prioritized plan (no test code written yet) for closing the remaining coverage gaps, built from the latest `coverage/coverage-summary.json`, the two prior review docs ([08-14](./code-review-2026-08-14.md), [08-17](./code-review-2026-08-17.md)), and a fresh read of every file recommended below — no target was planned from coverage numbers alone.

- **Inputs:** coverage summary (worst-first), both review docs' "Suggested test targets" sections, direct reads of all five zero-test stores, `HomePage.tsx`, `StatsDialog.tsx`, `ExpandableText.tsx`, `ThemedLayout.tsx`, `AdvancedStats.tsx`, `HardModeSwitch.tsx`, the custom-question editor trio, and the existing test files whose patterns new tests should follow
- **Conventions (from `CLAUDE.md` + existing tests):** import `describe`/`it`/`expect`/`vi` explicitly from `vitest` (no globals); reset stores with `store.setState(store.getInitialState(), true)`; `tests/` mirrors `src/`; run `npm run test:coverage` after each tier to confirm the numbers actually move
- **Established mock patterns to reuse, not reinvent:**
  - Auth0: the `vi.mock("@auth0/auth0-react", ...)` block in `tests/integration/routing.test.tsx`
  - Deterministic questions: `useRetrievedStore.getState().setRetrieved(true)` (makes `safeIndex === questionNumber`, no fake timers needed) plus `vi.mock("../../src/data/questions")` with `importOriginal` to replace specific entries — both from `tests/components/grid/GameGrid.test.tsx`
  - Module-load-time localStorage reads: `vi.resetModules()` + dynamic import per test — from `tests/stores/hardModeStore.test.ts`

**Tally:** 2 P0 (the two big real gaps) · 5 P1 · 6 P2 · 4 explicit exclusions

**Tier definitions:** P0 = real untested logic explicitly flagged by prior reviews, with known edge cases. P1 = real logic/branches, lower blast radius. P2 = thin wrappers, presentational components, or cheap regression pins — do only after P0/P1. Excluded = dead code or already-covered.

---

## P0 — the two gaps both review docs point at

### P0-1 · The five zero-test-file Zustand stores — effort M total (S each)

The 08-17 review calls these "small, correct, idiomatic Zustand — no defects found," so the goal is a compact contract pin per store, not padding. Five new files, all following the reset pattern in `tests/stores/gameStateStore.test.ts`. All five are pure `set()`-based stores except `highContrastStore`, which reads localStorage at module load and needs the `vi.resetModules()` + dynamic-import pattern from `hardModeStore.test.ts`.

| Store | New test file | What to pin |
|---|---|---|
| `src/stores/currGuessStore.ts` | `tests/stores/currGuessStore.test.ts` | `addChar` appends and increments `index`; `deleteChar` removes the char at `index - 1` and decrements; **`deleteChar` on an empty guess stays at `{guess: [], index: 0}`** (the `Math.max(0, -1)` clamp — the one real edge case); `resetGuess` clears both; `importGuess(arr)` sets `guess` and `index = arr.length`; **`importGuess([])` → `{[], 0}`** — this is exactly what `ProgressBar.tsx`'s `?? []` guard feeds it (the 08-17 finding whose `TypeError` lived at `cachedGuess.length` in this store), so pinning it here documents the contract the fix relies on |
| `src/stores/dialogStore.ts` | `tests/stores/dialogStore.test.ts` | Initial state: `isLandingOpen: true`, other three `false` (the landing-open default is load-bearing — `routing.test.tsx` has to dismiss it); each `set*Open` flips only its own flag (assert the other three untouched); `closeAllDialogs` zeroes all four including `isLandingOpen` |
| `src/stores/editingStore.ts` | `tests/stores/editingStore.test.ts` | Default `editing: false`; `setEditing(true)`/`setEditing(false)`. Genuinely tiny — 2–3 cases, write it in the same sitting as the others rather than as its own task |
| `src/stores/highContrastStore.ts` | `tests/stores/highContrastStore.test.ts` | Module-load init: `localStorage "highContrast" === "true"` → `true`; missing key, `"false"`, and a non-exact value like `"TRUE"` → `false` (the comparison is strict); `toggleHighContrast` flips state **and** persists the string `"true"`/`"false"` back. Unlike `hardModeStore` there is deliberately no `fromToday` day-gate here (per the 08-17 "already solid" note) — no need to fake timers |
| `src/stores/retrievedStore.ts` | `tests/stores/retrievedStore.test.ts` | Defaults: `retrieved: false`, `questionID: undefined`; `setRetrieved` and `setQuestionID` are independent (setting one leaves the other untouched). Small, but worth having because `setRetrieved(true)` is the lever half the component test suite uses to get deterministic question indices — a test documents that contract explicitly |

**Why P0 despite being small:** these are the last stores with zero files, they're cheap, and `currGuessStore`/`highContrastStore` have genuine edge cases (index clamping, module-load localStorage init). Finishing them also makes the store suite uniformly complete, which matters for the HomePage work below — those tests assert against these stores' state.

### P0-2 · `HomePage.tsx` — `onEnter`/`onChar` game logic and the persistence effects — effort L

36% lines / 18% branches on a 99-line file, and the one item both review docs flag as still open ("answer-matching in `onEnter` — exact match, `altAnswer` matches, addOn-permutation matching in hard mode — deep dependencies make this a bigger lift"). The lift is real but smaller than the 08-14 doc feared, because the mocking patterns it needs have all been established since:

**Test files:** `tests/pages/HomePage.test.tsx` (gameplay) and `tests/pages/HomePage.persistence.test.tsx` (localStorage effects) — new `tests/pages/` directory, mirroring `src/pages/`. Two files rather than one because the persistence tests need localStorage seeding/timing setup the gameplay tests don't, and a single file covering both would blur which `beforeEach` state matters for which case. (The existing `ErrorPage` coverage lives in `tests/integration/` because it renders the full router; HomePage rendered directly belongs under `tests/pages/`.)

**Mock strategy (the concrete answer to "what to mock"):**

1. **Auth0** — copy `routing.test.tsx`'s `vi.mock("@auth0/auth0-react")` block verbatim. HomePage itself never calls `useAuth0`, but its `NavBar` (and `HamburgerDrawer`/`ProfileButton` inside it) does.
2. **Router** — render inside `<MemoryRouter>`; `NavBar`/`ProfileButton` call `useNavigate`. No route table needed.
3. **`useQuestions` — do NOT mock the hook.** It just returns the local `questions` array (the MongoDB branch is commented out — see Exclusions). Instead mock the data underneath it: `vi.mock("../../src/data/questions")` with `importOriginal`, replacing entries 0–2 with short known answers, at least one carrying `altAnswer` and `addOns` — exactly the precedent `GameGrid.test.tsx` set. Every consumer (`useQuestions`, `useQuestionByID`, `ProgressBar`) then agrees on the same data.
4. **Daily index** — `useRetrievedStore.getState().setRetrieved(true)` in `beforeEach`, so `safeIndex === questionNumber` and no fake timers are needed. (Tradeoff: `vi.setSystemTime` would also work, but `retrieved` is what the existing component tests use, and it avoids the module-scope frozen-`presentDate` complication.) The persistence tests are the exception — they compare against `dailyIndex`, so import `getDailyIndex` from `src/hooks/useDailyIndex` and use its live value when seeding `pastOffset`.
5. **`Keyboard` — mock the component.** `vi.mock` it with a stub that stashes the latest `{onChar, onDelete, onEnter}` props in a module-level holder so tests invoke them directly. Tradeoff considered: driving the real on-screen keys via `fireEvent.click` exercises more integration but re-tests Keyboard's own gating (already covered in `Keyboard.test.tsx`), runs slower, and requires dismissing the landing dialog and its aria-hidden exit transition. Prop-driving isolates exactly the closures HomePage owns — which is the untested code. Keep one full-render smoke case with real keys if the integration comfort is wanted.
6. **`beforeEach`** — `localStorage.clear()` plus resets for `gameStateStore`, `currGuessStore`, `statsStore`, `dialogStore`, `retrievedStore`, `editingStore`, and `hardModeStore` (via `setHardMode(false)`).

**Gameplay cases (`HomePage.test.tsx`):**

- [ ] Exact-match win: `onChar` each letter, `onEnter` → `questionState[0] === "won"`, guess recorded in `guesses[0][0]`, `currGuessStore` reset
- [ ] Wrong full-length guess: `guessNumber[0]` increments, question stays `inProgress` (the `"Incorrect :("` branch)
- [ ] Losing guess: with `guessNumber[0] === MAX_CHALLENGES - 1`, a wrong `onEnter` → `questionState[0] === "lost"` **and** the `Answer was {answerWithSpaces}` Alert renders — cover both the with-`fullAnswer` (`, as in ...`) and without branches (line ~196)
- [ ] Normal-mode length gate: partial guess + `onEnter` is a no-op — `guessNumber` unchanged (`index === answer.length`, line 230)
- [ ] **Hard-mode empty-guess gate (08-17 regression):** hard mode on, zero letters typed, `onEnter` → no guess consumed (`hardMode && index > 0`)
- [ ] Hard-mode acceptance: an `altAnswer` guess wins; an `addOn`-prefix guess (`addOn + answer`) wins — the case `getAcceptableAnswers` was specifically fixed to produce. `acceptableAnswers.test.ts` already covers the util itself; these cases cover the *wiring* (line 232–233)
- [ ] The same `altAnswer` guess **rejected in normal mode** — the condition is `guess === answer || (hardMode && acceptable.includes(guess))`, so alt answers only count in hard mode. Worth pinning deliberately: if that's not intended behavior, the failing expectation is the conversation-starter
- [ ] `onChar` gating: normal mode blocks chars past `answer.length` while hard mode allows overtyping (`hardMode || index < answer.length`, line 211); blocked entirely once `questionState[questionNumber] !== "inProgress"`; `cacheGuess` called with the appended guess
- [ ] Advancing: after question 0 finishes, a second `onEnter` → `resetGuess` + `moveToNextQuestion` (line 319–325)
- [ ] Game end, all won: `gameState === "won"`, `statsStore.numQuestionsAttempted += QUESTIONS_PER_DAY`, `questionsGuessedIn` bumped at the right bucket, per-category `advancedStats` updated through `recordCategoryGuess`/`finalizeCategoryAttempt`, and `dialogStore.isStatsOpen === true`. This exercises the subtle `hasOneMoreGuess && won` branch (lines 256–296): the final question's win must count in stats even though `questionState` in the closure is still stale from before the winning dispatch
- [ ] Game end, lost: `loseGame()` fires; a lost question contributes `guessIncrease = 0`; a question with zero real guesses hits the `guessIndex < 0` early-return (line 287, the 08-14 `-1`-index fix)

**Persistence cases (`HomePage.persistence.test.tsx`):**

- [ ] Dispatching `visibilitychange` on `window` writes `prevGame` (with `pastOffset === getDailyIndex()`, `gameState`, `questionState`, `questionNumber`, `guessNumber`, `guesses`) and `gameStats` with the expected keys
- [ ] Restore: seeded `prevGame` with matching `pastOffset` → `importGame` applied, and for an `inProgress` game the in-flight guess is restored via `importGuess` (including the 08-17 `?.`-chain guard: a shape-mangled `guesses` restores `[]` instead of throwing)
- [ ] Mismatched `pastOffset` → previous game ignored
- [ ] `gameStats` restore: matching `dailyIndex` keeps `changedToday`; a different `dailyIndex` resets it to all-`false` (lines 124–127); absent stats → no import

---

## P1 — real logic, next in line

### P1-1 · `StatsDialog.tsx` share-text scoring and share/copy branching — effort M
`tests/components/navbar/stats/StatsDialog.test.tsx` (new). 50.7% lines / **28.9% branches** on 67 lines — the biggest branch gap outside HomePage, and the `textToShare` builder is real scoring logic:

- Seed `gameStateStore.guesses`/`questionState` (with `setRetrieved(true)` + the questions-data mock for known answers), render with `open`, and capture the share text by `vi.mock("copy-to-clipboard")` and asserting its first argument after clicking Share under a Windows UA (which forces the copy path)
- Emoji mapping: ✅ exact match, ✅ via `prevCorrect` carry-forward, ✅ via hard-mode acceptable answer (`q[2].includes`), ⏭️ for `SKIP_LETTER` guesses, ❌ otherwise; each line ends `${IN_TEXT} ${category}`
- Points math: 5 per won question + 1 per ✅ + `numSkipped * 0.5` added **once** at the first correct guess (`countedSkipped`) — e.g. skip, skip, correct → +1 bonus point; hard-mode `*` suffix in the header line
- `handleShare` OS branch: `navigator.share` defined + non-Windows UA → `navigator.share` called with the text; Windows UA (or no `navigator.share`) → `handleCopy` + the `GAME_COPIED_MESSAGE` Snackbar appears. Note: the 08-14 doc's still-open Moderate finding wants share *rejection* to also fall back to `handleCopy` — if that fix lands, add its test in the same change; until then don't pin the swallowed-rejection behavior as if it were intended

### P1-2 · `ExpandableText.tsx` — skip logic and question-reveal pacing — effort M
`tests/components/question/ExpandableText.test.tsx` (new). 70.6% lines / 38.5% branches, and it owns the skip mechanic:

- Summary truncation: while `inProgress` and `guessNumber < MAX_CHALLENGES`, renders `children.substring(0, guessNumber * length) + "..."`, growing per guess; full text once finished
- Skip button: normal mode → `makeGuess(Array(answer.length).fill(SKIP_LETTER))` + `resetGuess`; **hard mode → `Array(Math.max(guess.length, 1))`** (an empty current guess still burns exactly one `"-"`) — assert via `gameStateStore.guesses`
- Finished question, game in progress → button becomes next-question, click calls `resetGuess` + `moveToNextQuestion`
- Game over → click sets `isStatsOpen`; label branches: `NUMBER_CORRECT_TEXT(numWon)` when lost vs `WIN_MESSAGE_TEXT(...)` when won (stub `Math.random` or match loosely — `randomIndex` re-rolls per render, a known 08-17 efficiency note)
- Empty `children` → renders `null`

### P1-3 · `ThemedLayout.tsx` — theme-preference detection and toggle — effort M
`tests/components/ThemedLayout.test.tsx` (new). The detection chain (localStorage → `prefers-color-scheme` → light default) is the logic the 08-17 doc called "defensively written" — pin it:

- `localStorage "theme" = "dark"`/`"light"` honored on mount (read via a probe child calling `useTheme()` and asserting `palette.mode`)
- No stored key + `matchMedia` dark → dark mode **and** `"dark"` persisted to localStorage; light branch persists `"light"` (override `tests/setup.ts`'s `matchMedia` polyfill per-test to control `matches`)
- `ColorModeContext.toggleColorMode` flips mode and persists
- `highContrastStore` true → `palette.success.main === "#F5793A"` (the colorblind palette swap), false → the default green

### P1-4 · `AdvancedStats.tsx` — weighted-average math — effort S
`tests/components/navbar/stats/AdvancedStats.test.tsx` (new). 12.5% lines, but unlike the other low-coverage components this one computes something: seed `statsStore.advancedStats` with a known `questionsGuessedIn` (e.g. `[2,1,0,0,0]` → average `(2·1 + 1·2)/3 = 1.33`), assert the rendered per-category average and `numQuestionsAttempted`; a zero-guess category renders `0` via the `Math.max(..., 1)` divide-by-zero guard; header row + one row per `ALL_CATEGORIES` entry.

### P1-5 · `HardModeSwitch.tsx` — the blocked-toggle branch — effort S
`tests/components/navbar/settings/HardModeSwitch.test.tsx` (new). The missing 50% of branches is exactly the interesting one: `canToggleHardMode` is only true while every guess slot in `gameStateStore` is still empty. Fresh store → toggling flips `hardModeStore`; after one `makeGuess` → toggle refused, `HARD_MODE_ALERT_MESSAGE` Snackbar shown, `hardMode` unchanged.

---

## P2 — wrappers, pins, and nice-to-haves (only after P0/P1)

- [ ] **`ErrorPage.tsx` branch completion** — extend `tests/integration/errorPage.test.tsx` (S). The two existing tests cover only the route-error path; the `Error`-instance, `string`, and unknown (`"Unknown error"` + `console.error`) branches of the discrimination chain are uncovered. Also assert dialogs end up closed — pins behavior across the still-open 08-14 fix that moves `closeAllDialogs()` into a `useEffect`.
- [ ] **`HamburgerDrawer.tsx`** — `tests/components/navbar/drawer/HamburgerDrawer.test.tsx` (S–M). Menu click opens the drawer; Login item when unauthenticated vs Log Out when authenticated (make the shared Auth0 mock's `isAuthenticated` a mutable holder); Help/Stats items set the right `dialogStore` flags; the `Tab`/`Shift` keydown early-return in `toggleDrawer` (its only real branch).
- [ ] **`UserProfilePage.tsx`** — `tests/pages/UserProfilePage.test.tsx` (S). `isLoading` → "Loading ..."; unauthenticated → renders nothing; authenticated → name/email/avatar; delete-account `mailto:` href contains the `encodeURIComponent`-encoded email (pins the 08-17 encoding fix).
- [ ] **`NavBar.tsx` mobile/desktop branch** (S, low value). 75% already via integration tests; the gap is the `useMediaQuery` mobile arm (small buttons, no Help/Stats buttons). Cheap via a `matchMedia` stub, but expect little insight.
- [ ] **Custom-question editor (`CustomizableText`, `QuestionInputForm`, `QuestionInputFormMulti`)** — per this project's own notes, question editing is an **unfinished experimental feature, not a real coverage gap** — its 6–10% numbers should not drive prioritization. If touched at all, limit to two one-assertion regression pins from 08-17 (`tests/components/question/custom/QuestionInputFormMulti.test.tsx`): `getOptionLabel` returns the whole option string (chips show "Roosevelt", not "R"), and — better done as one case inside the HomePage suite — the `key={questionNumber}` remount on tab-switch while editing. (S)
- [ ] **Thin icon-button wrappers — deliberately skipped.** `PlaceHolderText`, `LoginButton`, `LogoutButton`, `HelpButton`, `StatsButton`, `SettingsButton`, `SubscribeButton`, `ShareLandingButton`, `HardModeLandingButton`, `HowToPlayLandingButton`, `ProfileButton`, `EditingButton` are each a few lines wrapping an MUI button around a store setter or `navigate` call. Most will pick up incidental coverage from the suites above (StatsDialog, HamburgerDrawer, NavBar). The only assertions worth writing on purpose are two 08-17 aria regression pins — `StatsButton` uses `STATS_BUTTON_ARIA` (not "help"), and `EditingButton`'s aria-label matches its visible text per `editing` state — bundle both into one small file if done at all. (S)

---

## Excluded — do not write tests for these

- **`src/hooks/useMongoDBQuestions.tsx` (0%), `src/services/api-client.ts` (0%), and the commented-out MongoDB branch in `useQuestions.ts`** — dead/experimental per `CLAUDE.md`'s Known gotchas; the real backend is not wired up. Testing them now would cement an API contract that doesn't exist yet and rot the moment the feature is actually finished. `useQuestions.ts`'s own remaining uncovered line is the `console.log(questionID)` arm of the same dead plumbing — skip it too. Revisit only when the MongoDB path is turned back on (at which point the 08-14 doc's open finding about timeouts/interceptors is the test spec).
- **`main.py`** — dead Lambda handler, not TS/React, not in the build.
- **`src/components/keyboard/Key.tsx` in isolation** — the 08-17 doc noted it's only covered indirectly, but that indirect coverage already yields 100% lines; an isolation suite would re-assert what `Keyboard.test.tsx` proves. Rank below everything above; realistically skip.
- **Everything at 100% lines / high branches** (grid components, most landingPage/settings, `useDailyIndex`, `acceptableAnswers`, `safeParse`, `gameStateStore` at 95.8%, etc.) — no action.

---

## Suggested order

1. P0-1 store files (one sitting — they also harden the assertions P0-2 depends on)
2. P0-2 HomePage gameplay file, then the persistence file
3. `npm run test:coverage` — HomePage should jump from 36%/18% to the 80s+; confirm before continuing
4. P1 in listed order (StatsDialog first — biggest remaining branch gap)
5. P2 only as fill-in work, and skip the wrapper buttons unless bundling the two aria pins
