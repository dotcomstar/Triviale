import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES } from "../constants/settings";
import { ALL_CATEGORIES } from "../data/questions";

interface BaseStatsStoreImport {
  numQuestionsAttempted: number;
  questionsGuessedIn: number[];
  changedToday: boolean[];
}

type AdvancedStat = {
  [category: string]: BaseStatsStoreImport;
};

export interface StatsStoreImport extends BaseStatsStoreImport {
  currentStreak?: number;
  maxStreak?: number;
  advancedStats?: AdvancedStat;
}

export interface StatsStore extends StatsStoreImport {
  importStats: (pastStore: StatsStoreImport) => void;
  logGame: (game: StatsStoreImport) => void;
}

const useStatsStore = create<StatsStore>((set) => ({
  numQuestionsAttempted: 0,
  questionsGuessedIn: Array(MAX_CHALLENGES).fill(0),
  changedToday: Array(MAX_CHALLENGES).fill(false),
  currentStreak: 1,
  maxStreak: 0,
  advancedStats: ALL_CATEGORIES.reduce((acc, category) => {
    return {
      ...acc,
      [category]: {
        numQuestionsAttempted: 0,
        questionsGuessedIn: Array(MAX_CHALLENGES).fill(0),
        changedToday: Array(MAX_CHALLENGES).fill(false),
      },
    };
  }, {}),
  importStats: (pastStore: StatsStoreImport) => {
    set(() => ({
      numQuestionsAttempted: pastStore.numQuestionsAttempted,
      questionsGuessedIn: pastStore.questionsGuessedIn,
      changedToday: pastStore.changedToday,
      currentStreak: pastStore.currentStreak,
      advancedStats: pastStore.advancedStats,
    }));
  },
  logGame: (game: StatsStoreImport) => {
    set((state) => ({
      numQuestionsAttempted:
        state.numQuestionsAttempted + game.numQuestionsAttempted,
      // FIXME: Implement merging advanced stats.
      advancedStats: { ...state.advancedStats },
      questionsGuessedIn: state.questionsGuessedIn.map(
        (v, i) => v + game.questionsGuessedIn[i]
      ),
      changedToday: state.changedToday.map((v, i) => v || game.changedToday[i]),
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Stats Store", useStatsStore);

export default useStatsStore;
