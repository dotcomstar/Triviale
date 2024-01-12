import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import useDailyIndex from "../hooks/useDailyIndex";

interface DialogStore {
  isHelpOpen: boolean;
  isStatsOpen: boolean;
  isSettingsOpen: boolean;
  isLandingOpen: boolean;
  setHelpOpen: (b: boolean) => void;
  setStatsOpen: (b: boolean) => void;
  setSettingsOpen: (b: boolean) => void;
  setLandingOpen: (b: boolean) => void;
  closeAllDialogs: () => void;
}

const dailyIndex = useDailyIndex();
const existingGuesses = localStorage.getItem("prevGame") || "{}";
const pastGuesses = JSON.parse(existingGuesses);
const gameStateFinished =
  pastGuesses["pastOffset"] === dailyIndex &&
  (pastGuesses["gameState"] === "won" || pastGuesses["gameState"] === "lost");

const useDialogStore = create<DialogStore>((set) => ({
  isHelpOpen: false,
  isStatsOpen: gameStateFinished,
  isSettingsOpen: false,
  isLandingOpen: !gameStateFinished,
  setHelpOpen: (b: boolean) => set(() => ({ isHelpOpen: b })),
  setStatsOpen: (b: boolean) => set(() => ({ isStatsOpen: b })),
  setSettingsOpen: (b: boolean) => set(() => ({ isSettingsOpen: b })),
  setLandingOpen: (b: boolean) => set(() => ({ isLandingOpen: b })),
  closeAllDialogs: () =>
    set(() => ({
      isHelpOpen: false,
      isStatsOpen: false,
      isSettingsOpen: false,
      isLandingOpen: false,
    })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Dialog Store", useDialogStore);

export default useDialogStore;
