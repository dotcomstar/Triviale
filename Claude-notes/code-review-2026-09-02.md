# Triviale Code Review — 2026-09-02

Review of `70aae8c` (typing, flip, win-wave, and confetti animations), with
follow-up fixes started in the same working session.

## Findings

### Resolved — winning rows suppressed the flip animation

`src/components/grid/Cell.tsx:150-158` (pre-fix)

On a live winning submission, a Cell received its newly scored `status` and
`winBounceDelayMs` in the same render. The animation conditional selected the
delayed bounce before it considered `isFlipping`, so the effect that later set
`isFlipping` could not make the flip visible. The confetti/dialog delay still
waited for the theoretical flip duration, but the user only saw the wave.

Fixed by composing the non-overlapping flip and delayed bounce into one CSS
animation value. The regression test now asserts that a live winning score
contains both animations.

### Resolved — completed rows replayed their win wave on mount

`src/components/grid/GameGrid.tsx:105-107` and `src/components/grid/Cell.tsx`
(pre-fix)

Every mounted final row for a won question received `winBounceDelayMs`. That
replayed the wave after restoring a completed game or returning to a completed
question tab, unlike the intended no-replay behavior of score flips.

Fixed by starting the wave only when the Cell transitions from unscored to
scored. A Cell that mounts with existing scored state stays still.

### Resolved — reduced-motion changes could leave a score mid-flip

`src/components/grid/Cell.tsx:108-120` (pre-fix)

If the system preference changed to reduced motion after a status arrived, the
effect treated the status as no longer new and returned before revealing it or
clearing the active flip. The preference now independently reveals any pending
status and clears both animation states immediately.

## Verification

- `npm run lint`
- `npm test -- --run`
- `npm run build`
