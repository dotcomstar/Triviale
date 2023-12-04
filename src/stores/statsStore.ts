import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES } from "../constants/settings";

export interface StatsStoreImport {
  numQuestionsAttempted: number;
  questionsGuessedIn: number[];
  changedToday: boolean[];
  currentStreak?: number;
  maxStreak?: number;
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
  importStats: (pastStore: StatsStoreImport) => {
    set(() => ({
      numQuestionsAttempted: pastStore.numQuestionsAttempted,
      questionsGuessedIn: pastStore.questionsGuessedIn,
      changedToday: pastStore.changedToday,
      currentStreak: pastStore.currentStreak,
    }));
  },
  logGame: (game: StatsStoreImport) => {
    set((state) => ({
      numQuestionsAttempted:
        state.numQuestionsAttempted + game.numQuestionsAttempted,
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
