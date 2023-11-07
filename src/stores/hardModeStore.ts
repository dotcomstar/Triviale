import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import useDailyIndex from "../hooks/useDailyIndex";

interface HardModeStore {
  hardMode: boolean;
  toggleHardMode: () => void;
}

const dailyIndex = useDailyIndex();
const existingGuesses = localStorage.getItem("prevGame") || "{}";
const pastGuesses = JSON.parse(existingGuesses);
const fromToday = pastGuesses["pastOffset"] === dailyIndex;

const useHardModeStore = create<HardModeStore>((set) => ({
  hardMode: localStorage.getItem("hardMode") === "true" && fromToday,
  toggleHardMode: () => {
    set((state) => {
      localStorage.setItem("hardMode", (!state.hardMode).toString());
      return { hardMode: !state.hardMode };
    });
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Hard Mode Store", useHardModeStore);

export default useHardModeStore;
