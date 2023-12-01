import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES } from "../constants/settings";
import { PLACEHOLDER_TEXT } from "../constants/strings";

export interface StatsStoreImport {
  totalGuesses: number[];
  totalCorrect: number[];
}

export interface StatsStore {
  totalGuesses: number[];
  totalCorrect: number[];
  currentStreak: number | string;
  maxStreak: number | string;
  changedToday: boolean[];
  importStats: (pastStore: StatsStoreImport) => void;
}

const useStatsStore = create<StatsStore>((set) => ({
  totalGuesses: [1, 2, 7, 12, 8],
  totalCorrect: [0, 1, 2, 10, 6],
  currentStreak: PLACEHOLDER_TEXT,
  maxStreak: PLACEHOLDER_TEXT,
  changedToday: Array(MAX_CHALLENGES).fill(false),
  importStats: (pastStore: StatsStoreImport) => {
    set(() => ({
      totalGuesses: pastStore.totalGuesses,
      totalCorrect: pastStore.totalCorrect,
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Stats Store", useStatsStore);

export default useStatsStore;
