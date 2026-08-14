import { beforeEach, describe, expect, it, vi } from "vitest";
import useGameStateStore from "../../src/stores/gameStateStore";

describe("gameStateStore", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    useGameStateStore.setState(useGameStateStore.getInitialState(), true);
  });

  it("starts in progress with all questions in progress", () => {
    const state = useGameStateStore.getState();
    expect(state.gameState).toBe("inProgress");
    expect(state.questionState).toEqual(["inProgress"]);
    expect(state.questionNumber).toBe(0);
  });

  it("winGame sets gameState to won", () => {
    useGameStateStore.getState().winGame();
    expect(useGameStateStore.getState().gameState).toBe("won");
  });

  it("loseGame sets gameState to lost", () => {
    useGameStateStore.getState().loseGame();
    expect(useGameStateStore.getState().gameState).toBe("lost");
  });

  it("winQuestion marks only the targeted question as won", () => {
    useGameStateStore.getState().winQuestion(0);
    expect(useGameStateStore.getState().questionState).toEqual(["won"]);
  });

  it("loseQuestion marks only the targeted question as lost", () => {
    useGameStateStore.getState().loseQuestion(0);
    expect(useGameStateStore.getState().questionState).toEqual(["lost"]);
  });

  it("moveToQuestion jumps directly to the given question number", () => {
    useGameStateStore.getState().moveToQuestion(0);
    expect(useGameStateStore.getState().questionNumber).toBe(0);
  });

  describe("moveToNextQuestion", () => {
    it("stays on the current question while it is still in progress", () => {
      useGameStateStore.getState().moveToNextQuestion();
      expect(useGameStateStore.getState().questionNumber).toBe(0);
    });

    it("moves to -1 once every question has been won or lost", () => {
      // With no remaining "inProgress" question, questionState.indexOf
      // finds nothing (-1). This documents the store's actual current
      // behavior, which the team's own code review flags as a suspect
      // invariant (there is no question at index -1).
      useGameStateStore.getState().winQuestion(0);
      useGameStateStore.getState().moveToNextQuestion();
      expect(useGameStateStore.getState().questionNumber).toBe(-1);
    });
  });

  it("makeGuess records the guess and increments the guess number for the current question", () => {
    useGameStateStore.getState().makeGuess(["a", "b", "c"]);
    const state = useGameStateStore.getState();
    expect(state.guessNumber[0]).toBe(1);
    expect(state.guesses[0][0]).toEqual(["a", "b", "c"]);
  });

  it("cacheGuess overwrites the current guess slot without advancing the guess number", () => {
    useGameStateStore.getState().cacheGuess(["a", "b", "c"]);
    const state = useGameStateStore.getState();
    expect(state.guessNumber[0]).toBe(0);
    expect(state.guesses[0][0]).toEqual(["a", "b", "c"]);
  });

  it("importGame overwrites the full snapshot", () => {
    useGameStateStore.getState().importGame({
      gameState: "won",
      questionState: ["won"],
      questionNumber: 0,
      guessNumber: [3],
      guesses: [[["a", "b"], [], [], [], []]],
    });
    const state = useGameStateStore.getState();
    expect(state.gameState).toBe("won");
    expect(state.questionState).toEqual(["won"]);
    expect(state.guessNumber).toEqual([3]);
    expect(state.guesses[0][0]).toEqual(["a", "b"]);
  });
});
