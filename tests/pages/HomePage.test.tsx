import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../../src/pages/HomePage";
import ThemedLayout from "../../src/components/ThemedLayout";
import {
  CONFETTI_LEAD_MS,
  MAX_CHALLENGES,
  QUESTIONS_PER_DAY,
} from "../../src/constants/settings";
import useCurrGuessStore from "../../src/stores/currGuessStore";
import useDialogStore from "../../src/stores/dialogStore";
import useEditingStore from "../../src/stores/editingStore";
import useGameStateStore from "../../src/stores/gameStateStore";
import useHardModeStore from "../../src/stores/hardModeStore";
import useRetrievedStore from "../../src/stores/retrievedStore";
import useStatsStore from "../../src/stores/statsStore";
import { getFlipTotalMs, getWaveTotalMs } from "../../src/utils/animationTiming";

// The real canvas-confetti call touches a <canvas> 2D context jsdom doesn't
// implement -- stubbed the same way Keyboard is below, so the game-end
// timing tests can assert it fired without pulling in real canvas support.
const confettiMock = vi.hoisted(() => vi.fn());
vi.mock("canvas-confetti", () => ({ default: confettiMock }));

// Same Auth0 mock block as tests/integration/routing.test.tsx. HomePage
// itself never calls useAuth0, but the NavBar it renders (and
// ProfileButton/HamburgerDrawer inside it) does.
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

// Replace the local question data with three short, known Q&A pairs so
// win/lose/altAnswer/addOn logic can be asserted exactly, following the
// vi.mock + importOriginal precedent in GameGrid.test.tsx. Every entry
// (not just 0-2) is forced onto the same category: HomePage's
// `todaysCategories` indexes by the *real* dailyIndex (it's one of the few
// index expressions in this file that doesn't respect `retrieved`, unlike
// every other `data[safeIndex]` access), which is non-deterministic at
// test-run time. Giving every entry the same category makes the
// recordCategoryGuess/finalizeCategoryAttempt wiring assertable regardless
// of which real index the live clock happens to land on.
// vi.mock factories are hoisted above every other top-level statement in
// this file, so anything they reference (MOCK_CATEGORY, testQuestions) has
// to be declared via vi.hoisted instead of a plain top-level const --
// otherwise it's a TDZ ReferenceError at import time.
const { MOCK_CATEGORY, testQuestions } = vi.hoisted(() => {
  const MOCK_CATEGORY = "SCI";
  const testQuestions = [
    { question: "Mock question 0", answer: "CAT", category: MOCK_CATEGORY },
    {
      question: "Mock question 1",
      answer: "DOG",
      altAnswer: ["PUP"],
      category: MOCK_CATEGORY,
    },
    {
      question: "Mock question 2",
      answer: "SUN",
      addOns: ["RE"],
      fullAnswer: "The Sun",
      category: MOCK_CATEGORY,
    },
  ];
  return { MOCK_CATEGORY, testQuestions };
});
vi.mock("../../src/data/questions", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../src/data/questions")>();
  return {
    ...actual,
    default: actual.default.map((q, i) =>
      i < testQuestions.length
        ? testQuestions[i]
        : { ...q, category: MOCK_CATEGORY }
    ),
  };
});

// Stub Keyboard and stash its latest {onChar, onDelete, onEnter} props in a
// module-level holder so tests can invoke them directly instead of driving
// real onscreen keys (which would re-test Keyboard's own gating, already
// covered by Keyboard.test.tsx). vi.hoisted is required because vi.mock
// factories run before any other top-level statement in this file.
const keyboardHolder = vi.hoisted(() => ({
  current: undefined as
    | {
        onChar: (value: string) => void;
        onDelete: () => void;
        onEnter: () => void;
      }
    | undefined,
}));
vi.mock("../../src/components/keyboard/Keyboard", () => ({
  default: (props: {
    onChar: (value: string) => void;
    onDelete: () => void;
    onEnter: () => void;
  }) => {
    keyboardHolder.current = props;
    return null;
  },
}));

// HomePage/NavBar's descendant components reference custom palette entries
// (e.g. "trivialeBlack"/"trivialeGray", primary.darker) that only exist on
// the app's own theme, built by ThemedLayout -- normally supplied via
// src/routes.tsx's Layout -> ThemedLayout -> Outlet chain. Rendering
// HomePage directly needs the same real ThemedLayout wrapper (not a mock),
// or MUI's default theme is missing those keys and throws.
const renderHomePage = () =>
  render(
    <MemoryRouter>
      <ThemedLayout>
        <HomePage />
      </ThemedLayout>
    </MemoryRouter>
  );

// Types one character at a time, each in its own act() so HomePage
// re-renders (and Keyboard's mock re-captures a fresh onChar closure)
// between keystrokes. Calling the captured onChar repeatedly inside a
// single act() would replay the SAME stale closure -- its `cacheGuess([
// ...guess, c])` call captures `guess` from the render that created it, so
// without a re-render in between, each call would overwrite the guess
// instead of accumulating it. Real keypresses don't hit this because each
// browser keyup is its own event/render cycle; it's purely an artifact of
// invoking the captured prop function directly in a test.
const typeGuess = (letters: string) => {
  letters.split("").forEach((ch) => {
    act(() => {
      keyboardHolder.current?.onChar(ch);
    });
  });
};
const pressEnter = () =>
  act(() => {
    keyboardHolder.current?.onEnter();
  });

describe("HomePage gameplay", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
    useStatsStore.setState(useStatsStore.getInitialState(), true);
    useDialogStore.setState(useDialogStore.getInitialState(), true);
    useEditingStore.setState(useEditingStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
    // Bypasses the real (non-deterministic, clock-based) dailyIndex for
    // every `data[safeIndex]` access that respects it, so questionNumber 0/1/2
    // map directly onto testQuestions 0/1/2 -- the GameGrid.test.tsx
    // precedent.
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    useRetrievedStore.getState().setRetrieved(true);
    // The landing dialog defaults to open (dialogStore.isLandingOpen), which
    // would otherwise sit on top of the page on every render.
    useDialogStore.getState().setLandingOpen(false);
    keyboardHolder.current = undefined;
    confettiMock.mockClear();
  });

  describe("winning and losing guesses", () => {
    it("an exact-match guess wins the question and resets the current guess", () => {
      renderHomePage();
      typeGuess("CAT");
      pressEnter();

      const state = useGameStateStore.getState();
      expect(state.questionState[0]).toBe("won");
      expect(state.guesses[0][0]).toEqual(["C", "A", "T"]);
      expect(useCurrGuessStore.getState().guess).toEqual([]);
      expect(useCurrGuessStore.getState().index).toBe(0);
    });

    it("a wrong full-length guess increments the guess count without ending the question", () => {
      renderHomePage();
      typeGuess("CAR"); // wrong, but the same length as "CAT"
      pressEnter();

      const state = useGameStateStore.getState();
      expect(state.questionState[0]).toBe("inProgress");
      expect(state.guessNumber[0]).toBe(1);
      expect(state.guesses[0][0]).toEqual(["C", "A", "R"]);
    });

    it("the final wrong guess loses the question and shows the plain answer", () => {
      renderHomePage();
      act(() => {
        for (let i = 0; i < MAX_CHALLENGES - 1; i++) {
          useGameStateStore.getState().makeGuess(["X", "X", "X"]);
        }
      });
      typeGuess("ZZZ");
      pressEnter();

      expect(useGameStateStore.getState().questionState[0]).toBe("lost");
      // Question 0 ("CAT") has no fullAnswer, so only the plain form shows.
      expect(screen.getByText(/Answer was CAT/)).toBeInTheDocument();
      expect(screen.queryByText(/, as in/)).not.toBeInTheDocument();
    });

    it("the final wrong guess loses the question and shows the answer with its fullAnswer", () => {
      renderHomePage();
      act(() => {
        useGameStateStore.getState().moveToQuestion(2); // "SUN", fullAnswer "The Sun"
        for (let i = 0; i < MAX_CHALLENGES - 1; i++) {
          useGameStateStore.getState().makeGuess(["X", "X", "X"]);
        }
      });
      typeGuess("ZZZ");
      pressEnter();

      expect(useGameStateStore.getState().questionState[2]).toBe("lost");
      expect(
        screen.getByText(/Answer was SUN, as in The Sun/)
      ).toBeInTheDocument();
    });
  });

  describe("submission gating", () => {
    it("a partial guess is a no-op in normal mode (the index === answer.length gate)", () => {
      renderHomePage();
      typeGuess("C"); // only 1 of "CAT"'s 3 letters
      pressEnter();

      expect(useGameStateStore.getState().guessNumber[0]).toBe(0);
      expect(useGameStateStore.getState().questionState[0]).toBe("inProgress");
      // Not reset -- onEnter's guess-processing block never ran.
      expect(useCurrGuessStore.getState().guess).toEqual(["C"]);
    });

    it("hard mode still requires at least one letter before submitting (08-17 regression)", () => {
      useHardModeStore.getState().setHardMode(true);
      renderHomePage();
      pressEnter(); // nothing typed at all

      expect(useGameStateStore.getState().guessNumber[0]).toBe(0);
      expect(useGameStateStore.getState().questionState[0]).toBe("inProgress");
    });
  });

  describe("hard-mode acceptance", () => {
    it("accepts an altAnswer guess in hard mode", () => {
      useHardModeStore.getState().setHardMode(true);
      renderHomePage();
      act(() => {
        useGameStateStore.getState().moveToQuestion(1); // "DOG", altAnswer "PUP"
      });
      typeGuess("PUP");
      pressEnter();

      expect(useGameStateStore.getState().questionState[1]).toBe("won");
    });

    it("accepts an addOn-prefix guess in hard mode", () => {
      useHardModeStore.getState().setHardMode(true);
      renderHomePage();
      act(() => {
        useGameStateStore.getState().moveToQuestion(2); // "SUN", addOn "RE"
      });
      typeGuess("RESUN"); // addOn + answer, the prefix form
      pressEnter();

      expect(useGameStateStore.getState().questionState[2]).toBe("won");
    });

    it("rejects the same altAnswer guess in normal mode -- pins current behavior, see final report", () => {
      // The win condition is `guess === answer || (hardMode &&
      // acceptable.includes(guess))`, so altAnswer/addOn matches only count
      // in hard mode. This test documents that as the app's actual current
      // behavior; if that's not intended, this is the test that should
      // start failing once it's changed.
      renderHomePage(); // hardMode defaults to false
      act(() => {
        useGameStateStore.getState().moveToQuestion(1); // "DOG", altAnswer "PUP"
      });
      typeGuess("PUP");
      pressEnter();

      expect(useGameStateStore.getState().questionState[1]).toBe("inProgress");
      expect(useGameStateStore.getState().guessNumber[1]).toBe(1);
    });
  });

  describe("onChar gating", () => {
    it("blocks typing past the answer length in normal mode", () => {
      renderHomePage();
      typeGuess("CATZ"); // "CAT" is 3 letters; the 4th should be dropped
      expect(useCurrGuessStore.getState().guess).toEqual(["C", "A", "T"]);
      expect(useCurrGuessStore.getState().index).toBe(3);
    });

    it("allows typing past the answer length in hard mode", () => {
      useHardModeStore.getState().setHardMode(true);
      renderHomePage();
      typeGuess("CATZ");
      expect(useCurrGuessStore.getState().guess).toEqual(["C", "A", "T", "Z"]);
    });

    it("blocks all typing once the question is no longer in progress", () => {
      renderHomePage();
      typeGuess("CAT");
      pressEnter(); // wins question 0
      expect(useGameStateStore.getState().questionState[0]).toBe("won");

      typeGuess("X"); // should be a no-op now
      expect(useCurrGuessStore.getState().guess).toEqual([]);
    });
  });

  describe("advancing and ending the game", () => {
    it("advances to the next in-progress question on a second Enter press", () => {
      renderHomePage();
      typeGuess("CAT");
      pressEnter(); // wins question 0, but stays on it
      expect(useGameStateStore.getState().questionNumber).toBe(0);

      pressEnter(); // second press: nothing typed, just advances
      expect(useGameStateStore.getState().questionNumber).toBe(1);
    });

    it("ends the game as won once every question is won, and records per-question and per-category stats", () => {
      // A game-ending win holds the stats dialog behind the winning row's
      // flip + wave animations and a confetti burst (HomePage.tsx's onEnter
      // handler) instead of opening it synchronously -- fake timers let this
      // test advance past that delay deterministically instead of racing it.
      vi.useFakeTimers();
      try {
        renderHomePage();

        typeGuess("CAT");
        pressEnter(); // question 0 won
        act(() => {
          useGameStateStore.getState().moveToQuestion(1);
        });
        typeGuess("DOG");
        pressEnter(); // question 1 won
        act(() => {
          useGameStateStore.getState().moveToQuestion(2);
        });
        typeGuess("SUN");
        pressEnter(); // question 2 won -- the final question, triggers game-end

        expect(useGameStateStore.getState().gameState).toBe("won");
        // Neither confetti nor the stats dialog have fired yet -- both are
        // still waiting on the scheduled delay.
        expect(confettiMock).not.toHaveBeenCalled();
        expect(useDialogStore.getState().isStatsOpen).toBe(false);

        const wordLength = "SUN".length;
        const confettiDelayMs =
          getFlipTotalMs(wordLength) + getWaveTotalMs(wordLength);
        act(() => {
          vi.advanceTimersByTime(confettiDelayMs);
        });
        expect(confettiMock).toHaveBeenCalledTimes(1);
        expect(useDialogStore.getState().isStatsOpen).toBe(false);

        act(() => {
          vi.advanceTimersByTime(CONFETTI_LEAD_MS);
        });
        expect(useDialogStore.getState().isStatsOpen).toBe(true);
      } finally {
        vi.useRealTimers();
      }

      const stats = useStatsStore.getState();
      expect(stats.numQuestionsAttempted).toBe(QUESTIONS_PER_DAY);
      // All three questions were won on their first guess.
      expect(stats.questionsGuessedIn[0]).toBe(QUESTIONS_PER_DAY);
      expect(stats.advancedStats?.[MOCK_CATEGORY].numQuestionsAttempted).toBe(
        QUESTIONS_PER_DAY
      );
      expect(stats.advancedStats?.[MOCK_CATEGORY].questionsGuessedIn[0]).toBe(
        QUESTIONS_PER_DAY
      );
    });

    it("ends the game as lost once every question is decided, with lost questions contributing zero to stats", () => {
      renderHomePage();

      // Lose questions 0 and 1 directly via the store, without ever making
      // a guess for either -- this is what puts them on the
      // guessIndex < 0 early-return path (the 08-14 regression fix,
      // pinned directly in gameStateStore.test.ts). Question 2 loses "for
      // real" through five wrong guesses via the UI.
      act(() => {
        useGameStateStore.getState().loseQuestion(0);
        useGameStateStore.getState().loseQuestion(1);
        useGameStateStore.getState().moveToQuestion(2);
      });

      for (let i = 0; i < MAX_CHALLENGES - 1; i++) {
        typeGuess("ZZZ");
        pressEnter();
      }
      // guessNumber[2] is now MAX_CHALLENGES - 1; this final wrong guess
      // loses question 2, and -- since it's the last question still
      // in progress -- ends the game via the hasOneMoreGuess branch.
      typeGuess("ZZZ");
      pressEnter();

      expect(useGameStateStore.getState().gameState).toBe("lost");
      expect(useGameStateStore.getState().questionState[2]).toBe("lost");

      const stats = useStatsStore.getState();
      // logGame's numQuestionsAttempted always advances by QUESTIONS_PER_DAY,
      // regardless of how many questions were actually won.
      expect(stats.numQuestionsAttempted).toBe(QUESTIONS_PER_DAY);
      // Nothing incremented: questions 0/1 hit the guessIndex < 0 skip,
      // and question 2's loss contributes guessIncrease 0.
      expect(stats.questionsGuessedIn).toEqual(Array(MAX_CHALLENGES).fill(0));
    });
  });
});
