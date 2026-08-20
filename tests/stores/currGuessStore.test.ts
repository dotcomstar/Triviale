import { beforeEach, describe, expect, it } from "vitest";
import useCurrGuessStore from "../../src/stores/currGuessStore";

describe("currGuessStore", () => {
  beforeEach(() => {
    useCurrGuessStore.setState(useCurrGuessStore.getInitialState(), true);
  });

  it("starts with an empty guess", () => {
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual([]);
    expect(state.index).toBe(0);
  });

  it("addChar appends the character and increments index", () => {
    useCurrGuessStore.getState().addChar("A");
    useCurrGuessStore.getState().addChar("B");
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual(["A", "B"]);
    expect(state.index).toBe(2);
  });

  it("deleteChar removes the character at index - 1 and decrements index", () => {
    useCurrGuessStore.getState().addChar("A");
    useCurrGuessStore.getState().addChar("B");
    useCurrGuessStore.getState().deleteChar();
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual(["A"]);
    expect(state.index).toBe(1);
  });

  it("deleteChar on an empty guess stays clamped at {guess: [], index: 0}", () => {
    // Regression: deleteChar's index update is Math.max(0, state.index - 1),
    // so calling it with nothing typed must not go negative.
    useCurrGuessStore.getState().deleteChar();
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual([]);
    expect(state.index).toBe(0);
  });

  it("resetGuess clears both guess and index", () => {
    useCurrGuessStore.getState().addChar("A");
    useCurrGuessStore.getState().addChar("B");
    useCurrGuessStore.getState().resetGuess();
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual([]);
    expect(state.index).toBe(0);
  });

  it("importGuess sets guess and index to the imported array's length", () => {
    useCurrGuessStore.getState().importGuess(["C", "A", "T"]);
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual(["C", "A", "T"]);
    expect(state.index).toBe(3);
  });

  it("importGuess([]) resets to {guess: [], index: 0} -- the contract ProgressBar's `?? []` guard relies on", () => {
    // This is exactly what ProgressBar.tsx feeds this store when the
    // targeted question has no guess recorded at the current guessNumber
    // slot (the 08-17 finding whose TypeError originated at
    // `cachedGuess.length` in this store, before the `?? []` guard existed).
    useCurrGuessStore.getState().addChar("A");
    useCurrGuessStore.getState().importGuess([]);
    const state = useCurrGuessStore.getState();
    expect(state.guess).toEqual([]);
    expect(state.index).toBe(0);
  });
});
