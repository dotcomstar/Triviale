import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import useDailyIndex from "../hooks/useDailyIndex";

interface OnscreenKeyboardOnlyStore {
  onscreenKeyboardOnly: boolean;
  toggleOnscreenKeyboardOnly: () => void;
}

const dailyIndex = useDailyIndex();
const existingGuesses = localStorage.getItem("prevGame") || "{}";
const pastGuesses = JSON.parse(existingGuesses);
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
