import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getDailyIndex } from "../hooks/useDailyIndex";
import { safeParse, JSONRecord } from "../utils/safeParse";

interface OnscreenKeyboardOnlyStore {
  onscreenKeyboardOnly: boolean;
  toggleOnscreenKeyboardOnly: () => void;
}

const dailyIndex = getDailyIndex();
const pastGuesses = safeParse<JSONRecord>("prevGame", {});
const fromToday = pastGuesses["pastOffset"] === dailyIndex;

const useOnscreenKeyboardOnlyStore = create<OnscreenKeyboardOnlyStore>(
  (set) => ({
    onscreenKeyboardOnly:
      localStorage.getItem("onscreenKeyboardOnly") === "true" && fromToday,
    toggleOnscreenKeyboardOnly: () => {
      set((state) => {
        localStorage.setItem(
          "onscreenKeyboardOnly",
          (!state.onscreenKeyboardOnly).toString()
        );
        return { onscreenKeyboardOnly: !state.onscreenKeyboardOnly };
      });
    },
  })
);

if (process.env.NODE_ENV === "development")
  mountStoreDevtool(
    "Onscreen Keyboard Only Store",
    useOnscreenKeyboardOnlyStore
  );

export default useOnscreenKeyboardOnlyStore;
