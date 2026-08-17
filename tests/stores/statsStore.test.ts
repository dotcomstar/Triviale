import { beforeEach, describe, expect, it } from "vitest";
import useStatsStore from "../../src/stores/statsStore";
import { ALL_CATEGORIES } from "../../src/data/questions";

describe("statsStore", () => {
  beforeEach(() => {
    useStatsStore.setState(useStatsStore.getInitialState(), true);
  });

  it("initializes advancedStats with all known categories zeroed", () => {
    const { advancedStats } = useStatsStore.getState();
    ALL_CATEGORIES.forEach((category) => {
      expect(advancedStats?.[category]).toEqual({
        numQuestionsAttempted: 0,
        questionsGuessedIn: expect.arrayContaining([0]),
        changedToday: expect.arrayContaining([false]),
      });
    });
  });

  it("recordCategoryGuess updates only the targeted category and index immutably", () => {
    const before = useStatsStore.getState().advancedStats;
    useStatsStore.getState().recordCategoryGuess("SCI", 1, 1);
    const after = useStatsStore.getState().advancedStats;

    expect(after).not.toBe(before);
    expect(after?.["SCI"].questionsGuessedIn[1]).toBe(1);
    expect(after?.["SCI"].questionsGuessedIn[0]).toBe(0);
    expect(after?.["HIS"]).toEqual(before?.["HIS"]);
  });

  it("recordCategoryGuess lazily initializes a category not in the initial set instead of throwing", () => {
    expect(() =>
      useStatsStore.getState().recordCategoryGuess("ANY", 0, 1)
    ).not.toThrow();
    expect(useStatsStore.getState().advancedStats?.["ANY"].questionsGuessedIn[0]).toBe(1);
  });

  it("finalizeCategoryAttempt lazily initializes a category not in the initial set instead of throwing", () => {
    expect(() =>
      useStatsStore.getState().finalizeCategoryAttempt("ANY")
    ).not.toThrow();
    expect(
      useStatsStore.getState().advancedStats?.["ANY"].numQuestionsAttempted
    ).toBe(1);
  });

  it("finalizeCategoryAttempt increments numQuestionsAttempted and recomputes changedToday", () => {
    useStatsStore.getState().recordCategoryGuess("SCI", 2, 1);
    useStatsStore.getState().finalizeCategoryAttempt("SCI");

    const sci = useStatsStore.getState().advancedStats?.["SCI"];
    expect(sci?.numQuestionsAttempted).toBe(1);
    expect(sci?.changedToday[2]).toBe(true);
    expect(sci?.changedToday[0]).toBe(false);
  });

  it("importStats merges advancedStats onto the default shape instead of overwriting it", () => {
    // Simulates an older/partial persisted "gameStats" blob that's missing
    // every category except one -- importStats should not drop the rest.
    useStatsStore.getState().importStats({
      numQuestionsAttempted: 5,
      questionsGuessedIn: [1, 2, 0, 0, 0],
      changedToday: [true, false, false, false, false],
      advancedStats: {
        SCI: {
          numQuestionsAttempted: 3,
          questionsGuessedIn: [1, 1, 1, 0, 0],
          changedToday: [true, true, true, false, false],
        },
      },
    });

    const { advancedStats } = useStatsStore.getState();
    expect(advancedStats?.["SCI"].numQuestionsAttempted).toBe(3);
    ALL_CATEGORIES.filter((c) => c !== "SCI").forEach((category) => {
      expect(advancedStats?.[category]).toEqual({
        numQuestionsAttempted: 0,
        questionsGuessedIn: expect.arrayContaining([0]),
        changedToday: expect.arrayContaining([false]),
      });
    });
  });
});
