import { beforeEach, describe, expect, it } from "vitest";
import useRetrievedStore from "../../src/stores/retrievedStore";

describe("retrievedStore", () => {
  beforeEach(() => {
    useRetrievedStore.setState(useRetrievedStore.getInitialState(), true);
  });

  it("defaults to retrieved: false and questionID: undefined", () => {
    const state = useRetrievedStore.getState();
    expect(state.retrieved).toBe(false);
    expect(state.questionID).toBeUndefined();
  });

  it("setRetrieved sets retrieved without touching questionID", () => {
    useRetrievedStore.getState().setQuestionID("abc123");
    useRetrievedStore.getState().setRetrieved(true);
    const state = useRetrievedStore.getState();
    expect(state.retrieved).toBe(true);
    expect(state.questionID).toBe("abc123");
  });

  it("setQuestionID sets questionID without touching retrieved", () => {
    useRetrievedStore.getState().setRetrieved(true);
    useRetrievedStore.getState().setQuestionID("xyz789");
    const state = useRetrievedStore.getState();
    expect(state.questionID).toBe("xyz789");
    expect(state.retrieved).toBe(true);
  });

  it("setRetrieved(true) is the lever component tests use for deterministic question indices", () => {
    // Documents the contract: with retrieved true, HomePage/Keyboard/etc.
    // compute safeIndex as questionNumber + 0 instead of
    // questionNumber + dailyIndex, which is what makes tests like
    // GameGrid.test.tsx and Keyboard.test.tsx deterministic without faking
    // the system clock.
    useRetrievedStore.getState().setRetrieved(true);
    expect(useRetrievedStore.getState().retrieved).toBe(true);
  });
});
