import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import copy from "copy-to-clipboard";
import StatsDialog from "../../../../src/components/navbar/stats/StatsDialog";
import {
  GAME_COPIED_MESSAGE,
  GAME_TITLE,
  SHARE_POINTS,
  SHARE_TEXT,
} from "../../../../src/constants/strings";
import useGameStateStore from "../../../../src/stores/gameStateStore";
import useHardModeStore from "../../../../src/stores/hardModeStore";
import useRetrievedStore from "../../../../src/stores/retrievedStore";
import useStatsStore from "../../../../src/stores/statsStore";

// The only way to observe StatsDialog's local `textToShare` const from
// outside the component is to intercept one of the two channels it's
// eventually handed to. copy-to-clipboard is the simpler of the two to mock.
vi.mock("copy-to-clipboard", () => ({ default: vi.fn() }));

// questionDetails(id) resolves via getPositiveIndex(id + offset), and
// setRetrieved(true) below forces offset to 0 -- so replacing indices 0-2
// (matching real gameStateStore's QUESTIONS_PER_DAY=3 `guesses` array) gives
// fully deterministic answers/categories/acceptable-answers for every
// guesses[i] a test seeds. Same vi.mock + importOriginal precedent as
// GameGrid.test.tsx / HomePage.test.tsx.
const { testQuestions } = vi.hoisted(() => ({
  testQuestions: [
    { question: "Q0", answer: "CAT", category: "SCI" },
    { question: "Q1", answer: "DOG", altAnswer: ["PUP"], category: "HIS" },
    { question: "Q2", answer: "SUN", addOns: ["RE"], category: "ART" },
  ],
}));
vi.mock("../../../../src/data/questions", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../../../src/data/questions")>();
  return {
    ...actual,
    default: actual.default.map((q, i) =>
      i < testQuestions.length ? testQuestions[i] : q
    ),
  };
});

const WINDOWS_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
const MAC_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: ua,
    configurable: true,
  });
};

const setNavigatorShare = (
  fn?: (data: { text?: string }) => Promise<void>
) => {
  if (fn) {
    Object.defineProperty(window.navigator, "share", {
      value: fn,
      configurable: true,
    });
  } else {
    delete (window.navigator as unknown as { share?: unknown }).share;
  }
};

const renderDialog = () =>
  render(
    <StatsDialog
      open={true}
      onClose={vi.fn()}
      TransitionComponent={undefined}
    />
  );

// Forces the Windows/no-native-share fallback so every click resolves
// through copy-to-clipboard, letting the test read the exact text
// StatsDialog built via the mock's call argument. Renders and unmounts on
// every call so it's safe to call more than once within a single test.
const getSharedText = () => {
  const { unmount } = renderDialog();
  setUserAgent(WINDOWS_UA);
  fireEvent.click(screen.getByRole("button", { name: SHARE_TEXT }));
  const mockCopy = vi.mocked(copy);
  const text = mockCopy.mock.calls[mockCopy.mock.calls.length - 1][0] as string;
  unmount();
  return text;
};

describe("StatsDialog", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    localStorage.clear();
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
    useHardModeStore.getState().setHardMode(false);
    useStatsStore.setState(useStatsStore.getInitialState(), true);
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
    useRetrievedStore.getState().setRetrieved(true);
    vi.mocked(copy).mockClear();
    setNavigatorShare(undefined);
  });

  describe("share-text emoji mapping", () => {
    it("marks exact/skip/wrong guesses correctly, and carries a win forward across a question's remaining slots", () => {
      useHardModeStore.getState().setHardMode(true); // needed for the altAnswer/addOn cases below
      useGameStateStore.getState().importGame({
        gameState: "inProgress",
        questionState: ["inProgress", "inProgress", "inProgress"],
        questionNumber: 0,
        guessNumber: [3, 1, 1],
        guesses: [
          [["X", "X", "X"], ["-", "-", "-"], ["C", "A", "T"], [], []],
          [["P", "U", "P"], [], [], [], []],
          [["R", "E", "S", "U", "N"], [], [], [], []],
        ],
      });

      const text = getSharedText();

      // Q0 (CAT): wrong, skip, exact match, then two never-submitted slots
      // that STILL render as ✅ -- once a question is won, `prevCorrect`
      // carries the ✅ mark forward across every remaining (unplayed) guess
      // slot for that question. Intentional: see the points-math test below.
      expect(text).toContain("❌⏭️✅✅✅ in SCI");
      // Q1 (DOG, altAnswer "PUP"): only counts as ✅ because hard mode is on.
      expect(text).toContain("✅✅✅✅✅ in HIS");
      // Q2 (SUN, addOn "RE" glued on as a prefix "RESUN"): also hard-mode-only.
      expect(text).toContain("✅✅✅✅✅ in ART");
    });
  });

  describe("points math", () => {
    it("adds 5 for a won question, 1 per ✅, and the skip bonus once at the first correct guess", () => {
      useHardModeStore.getState().setHardMode(false);
      useGameStateStore.getState().importGame({
        gameState: "inProgress",
        questionState: ["won", "inProgress", "inProgress"],
        questionNumber: 0,
        guessNumber: [3, 0, 0],
        guesses: [
          [["-", "-", "-"], ["-", "-", "-"], ["C", "A", "T"], [], []],
          [[], [], [], [], []],
          [[], [], [], [], []],
        ],
      });

      const text = getSharedText();

      // 5 (questionState "won") + 1 (2 skips * 0.5, added once) + 3 (the ✅
      // at the correct guess, plus the two now-unused slots after it, which
      // also carry forward as ✅). A won question always contributes the
      // same flat guess-points regardless of which guess actually won it --
      // confirmed intentional (a per-win flat bonus keeps the total a round
      // number; 3/15 on a perfect game would feel worse than 15/30, or
      // whatever the current ratio works out to).
      expect(text).toContain(SHARE_POINTS(9));
    });

    it("appends a '*' to the header line in hard mode and omits it in normal mode", () => {
      const today = new Date().toLocaleDateString();

      useHardModeStore.getState().setHardMode(true);
      const hardText = getSharedText();
      expect(hardText.split("\n")[0]).toBe(`${GAME_TITLE} ${today} *`);

      useHardModeStore.getState().setHardMode(false);
      const normalText = getSharedText();
      expect(normalText.split("\n")[0]).toBe(`${GAME_TITLE} ${today} `);
    });
  });

  describe("handleShare OS branching", () => {
    it("uses navigator.share directly on a non-Windows platform when it's available", () => {
      const shareFn = vi.fn().mockResolvedValue(undefined);
      setNavigatorShare(shareFn);
      setUserAgent(MAC_UA);
      renderDialog();

      fireEvent.click(screen.getByRole("button", { name: SHARE_TEXT }));

      expect(shareFn).toHaveBeenCalledWith({
        text: expect.stringContaining(GAME_TITLE),
      });
      expect(copy).not.toHaveBeenCalled();
    });

    it("falls back to copy on a Windows UA even when navigator.share exists", async () => {
      const shareFn = vi.fn().mockResolvedValue(undefined);
      setNavigatorShare(shareFn);
      setUserAgent(WINDOWS_UA);
      renderDialog();

      fireEvent.click(screen.getByRole("button", { name: SHARE_TEXT }));

      expect(shareFn).not.toHaveBeenCalled();
      expect(copy).toHaveBeenCalled();
      expect(await screen.findByText(GAME_COPIED_MESSAGE)).toBeInTheDocument();
    });

    it("falls back to copy when navigator.share doesn't exist at all, regardless of OS", async () => {
      setNavigatorShare(undefined);
      setUserAgent(MAC_UA);
      renderDialog();

      fireEvent.click(screen.getByRole("button", { name: SHARE_TEXT }));

      expect(copy).toHaveBeenCalled();
      expect(await screen.findByText(GAME_COPIED_MESSAGE)).toBeInTheDocument();
    });

    it("still-open 08-14 finding: a rejected share is only console.logged, never retried via copy", async () => {
      const shareFn = vi.fn().mockRejectedValue(new Error("share failed"));
      setNavigatorShare(shareFn);
      setUserAgent(MAC_UA);
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      renderDialog();

      fireEvent.click(screen.getByRole("button", { name: SHARE_TEXT }));
      // Flush the rejected promise's microtask queue so its .catch runs
      // before asserting nothing else happened.
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(copy).not.toHaveBeenCalled();
      expect(screen.queryByText(GAME_COPIED_MESSAGE)).not.toBeInTheDocument();
      expect(logSpy).toHaveBeenCalledWith("Error sharing", expect.any(Error));
    });
  });
});
