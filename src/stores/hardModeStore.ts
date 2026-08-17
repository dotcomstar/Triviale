import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getDailyIndex } from "../hooks/useDailyIndex";
import { safeParse, JSONRecord } from "../utils/safeParse";

interface HardModeStore {
  hardMode: boolean;
  toggleHardMode: () => void;
  setHardMode: (b: boolean) => void;
}

const dailyIndex = getDailyIndex();
const pastGuesses = safeParse<JSONRecord>("prevGame", {});
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
