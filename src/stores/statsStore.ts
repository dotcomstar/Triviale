import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES } from "../constants/settings";

export interface StatsStoreImport {
  totalGuesses: number[];
  totalCorrect: number[];
  changedToday: boolean[];
  currentStreak?: number;
  maxStreak?: number;
}

export interface StatsStore extends StatsStoreImport {
  importStats: (pastStore: StatsStoreImport) => void;
  logGame: (game: StatsStoreImport) => void;
}

const useStatsStore = create<StatsStore>((set) => ({
  //   totalGuesses: [1, 2, 7, 12, 8],
  //   totalCorrect: [0, 1, 2, 10, 6],
  //   totalGuesses: [1, 0, 1, 0, 1],
  //   totalCorrect: [1, 0, 1, 0, 1],
  totalGuesses: Array(MAX_CHALLENGES).fill(0),
  totalCorrect: Array(MAX_CHALLENGES).fill(0),
  currentStreak: 1,
  maxStreak: 0,
  changedToday: Array(MAX_CHALLENGES).fill(false),
  importStats: (pastStore: StatsStoreImport) => {
    set(() => ({
      totalGuesses: pastStore.totalGuesses,
      totalCorrect: pastStore.totalCorrect,
      changedToday: pastStore.changedToday,
      currentStreak: pastStore.currentStreak,
    }));
  },
  logGame: (game: StatsStoreImport) => {
    set(() => ({
      totalGuesses: game.totalGuesses,
      totalCorrect: game.totalCorrect,
      changedToday: game.changedToday,
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Stats Store", useStatsStore);

export default useStatsStore;
