import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import useDailyIndex from "../hooks/useDailyIndex";

interface HardModeStore {
  hardMode: boolean;
  toggleHardMode: () => void;
  setHardMode: (b: boolean) => void;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
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
  setHardMode: (b: boolean) =>
    set(() => {
      localStorage.setItem("hardMode", b.toString());
      return { hardMode: b };
    }),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Hard Mode Store", useHardModeStore);

export default useHardModeStore;
