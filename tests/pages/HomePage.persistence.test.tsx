import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../../src/pages/HomePage";
import ThemedLayout from "../../src/components/ThemedLayout";
import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "../../src/constants/settings";
import { getDailyIndex } from "../../src/hooks/useDailyIndex";
import useCurrGuessStore from "../../src/stores/currGuessStore";
import useDialogStore from "../../src/stores/dialogStore";
import useEditingStore from "../../src/stores/editingStore";
import useGameStateStore from "../../src/stores/gameStateStore";
import useHardModeStore from "../../src/stores/hardModeStore";
import useRetrievedStore from "../../src/stores/retrievedStore";
import useStatsStore from "../../src/stores/statsStore";

// Same Auth0 mock block as tests/integration/routing.test.tsx -- NavBar
// (rendered inside HomePage) calls useAuth0.
vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
  }),
  withAuthenticationRequired: (component: unknown) => component,
}));

// Not driving any typing/enter here, but stubbed anyway for consistency
// with HomePage.test.tsx and to avoid mounting the real onscreen keyboard's
// own key-rendering cost in every persistence test.
vi.mock("../../src/components/keyboard/Keyboard", () => ({
  default: () => null,
}));

// These persistence effects compare a saved snapshot's pastOffset/dailyIndex
// against the REAL (unmocked) dailyIndex, which is derived from the actual
// system clock -- so, per the plan, seed against its live value rather than
// a hardcoded number.
const dailyIndex = getDailyIndex();

const renderHomePage = () =>
  render(
    <MemoryRouter>
      <ThemedLayout>
        <HomePage />
      </ThemedLayout>
    </MemoryRouter>
  );

describe("HomePage persistence", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
    useStatsStore.setState(useStatsStore.getInitialState(), true);
    useDialogStore.setState(useDialogStore.getInitialState(), true);
    useDialogStore.getState().setLandingOpen(false);
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    useEditingStore.setState(useEditingStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
  });

  describe("saving on visibilitychange", () => {
    it("writes prevGame and gameStats to localStorage with the expected shape", () => {
      renderHomePage();
      act(() => {
        useGameStateStore.getState().moveToQuestion(1);
      });

      act(() => {
        window.dispatchEvent(new Event("visibilitychange"));
      });

      const initialGameState = useGameStateStore.getInitialState();
      const prevGame = JSON.parse(localStorage.getItem("prevGame") as string);
      expect(prevGame).toEqual({
        pastOffset: dailyIndex,
        gameState: initialGameState.gameState,
        questionState: initialGameState.questionState,
        questionNumber: 1,
        guessNumber: initialGameState.guessNumber,
        guesses: initialGameState.guesses,
      });

      const initialStats = useStatsStore.getInitialState();
      const gameStats = JSON.parse(localStorage.getItem("gameStats") as string);
      expect(gameStats).toEqual({
        numQuestionsAttempted: initialStats.numQuestionsAttempted,
        questionsGuessedIn: initialStats.questionsGuessedIn,
        changedToday: initialStats.changedToday,
        dailyIndex,
        advancedStats: initialStats.advancedStats,
      });
    });
  });

  describe("restoring a saved game", () => {
    it("imports gameState and the in-flight guess when pastOffset matches today", () => {
      const guesses = useGameStateStore
        .getInitialState()
        .guesses.map((questionGuesses, i) =>
          i === 1
            ? questionGuesses.map((g, gi) => (gi === 0 ? ["D", "O"] : g))
            : questionGuesses
        );
      localStorage.setItem(
        "prevGame",
        JSON.stringify({
          pastOffset: dailyIndex,
          gameState: "inProgress",
          questionState: ["inProgress", "inProgress", "inProgress"],
          questionNumber: 1,
          guessNumber: [0, 0, 0],
          guesses,
        })
      );

      renderHomePage();

      expect(useGameStateStore.getState().questionNumber).toBe(1);
      expect(useGameStateStore.getState().guesses[1][0]).toEqual(["D", "O"]);
      // The in-progress guess at guesses[questionNumber][guessNumber[questionNumber]]
      // is restored into currGuessStore via importGuess.
      expect(useCurrGuessStore.getState().guess).toEqual(["D", "O"]);
      expect(useCurrGuessStore.getState().index).toBe(2);
    });

    it("restores an empty in-flight guess instead of throwing when guessNumber points past the saved guesses (08-17 regression)", () => {
      // guessNumber[i] === MAX_CHALLENGES is not a corrupted/hand-edited
      // value -- it's what a completely normal loss (or a win on the final
      // try) leaves behind, per gameStateStore.makeGuess incrementing
      // guessNumber on every submitted guess, including the deciding one.
      // guesses[0] only has 5 slots (indices 0-4), so guesses[0][5] is
      // undefined -- this is exactly the shape the 08-17 fix's `?.`/`??`
      // chain in HomePage.tsx guards against.
      //
      // Deliberately NOT testing `guesses: []` here (an empty top-level
      // array): that shape also reaches HomePage.tsx's own guarded
      // importGuess call safely, but it crashes elsewhere first --
      // ProgressBar.tsx's *render* body reads `guesses[i].reduce(...)`
      // with no `?? []` guard (only its onClick handler was fixed in
      // 08-17), so `guesses[i]` being undefined throws during render, not
      // just in an event handler. That looks like a real, previously
      // undocumented gap -- see the final report -- but reproducing it
      // isn't this test's job, so it uses the shape the existing fix was
      // actually built for instead.
      localStorage.setItem(
        "prevGame",
        JSON.stringify({
          pastOffset: dailyIndex,
          gameState: "inProgress",
          questionState: ["lost", "inProgress", "inProgress"],
          questionNumber: 0,
          guessNumber: [MAX_CHALLENGES, 0, 0],
          guesses: useGameStateStore.getInitialState().guesses,
        })
      );

      expect(() => renderHomePage()).not.toThrow();
      expect(useCurrGuessStore.getState().guess).toEqual([]);
      expect(useCurrGuessStore.getState().index).toBe(0);
    });

    it("ignores a saved game whose pastOffset doesn't match today's daily index", () => {
      localStorage.setItem(
        "prevGame",
        JSON.stringify({
          pastOffset: dailyIndex + 1000, // clearly not today
          gameState: "won",
          questionState: ["won", "won", "won"],
          questionNumber: 0,
          guessNumber: [1, 1, 1],
          guesses: useGameStateStore.getInitialState().guesses,
        })
      );

      renderHomePage();

      expect(useGameStateStore.getState()).toMatchObject({
        gameState: "inProgress",
        questionNumber: 0,
      });
    });
  });

  describe("restoring saved stats", () => {
    it("keeps changedToday when the saved gameStats' dailyIndex matches today", () => {
      localStorage.setItem(
        "gameStats",
        JSON.stringify({
          numQuestionsAttempted: 3,
          questionsGuessedIn: [1, 1, 1, 0, 0],
          changedToday: [true, true, true, false, false],
          dailyIndex,
          advancedStats: {},
        })
      );

      renderHomePage();

      const stats = useStatsStore.getState();
      expect(stats.numQuestionsAttempted).toBe(3);
      expect(stats.changedToday).toEqual([true, true, true, false, false]);
    });

    it("resets changedToday to all-false when the saved gameStats are from a different dailyIndex", () => {
      localStorage.setItem(
        "gameStats",
        JSON.stringify({
          numQuestionsAttempted: 3,
          questionsGuessedIn: [1, 1, 1, 0, 0],
          changedToday: [true, true, true, false, false],
          dailyIndex: dailyIndex - QUESTIONS_PER_DAY, // yesterday's encoding
          advancedStats: {},
        })
      );

      renderHomePage();

      expect(useStatsStore.getState().changedToday).toEqual(
        Array(MAX_CHALLENGES).fill(false)
      );
      // numQuestionsAttempted and the rest of the snapshot are still
      // imported as-is -- only changedToday is day-gated.
      expect(useStatsStore.getState().numQuestionsAttempted).toBe(3);
    });

    it("does not import stats when no gameStats were saved", () => {
      renderHomePage();

      const stats = useStatsStore.getState();
      expect(stats.numQuestionsAttempted).toBe(0);
      expect(stats.questionsGuessedIn).toEqual(Array(MAX_CHALLENGES).fill(0));
    });
  });
});
