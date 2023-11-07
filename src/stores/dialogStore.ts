import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import useDailyIndex from "../hooks/useDailyIndex";

interface DialogStore {
  isHelpOpen: boolean;
  isStatsOpen: boolean;
  isSettingsOpen: boolean;
  setHelpOpen: (b: boolean) => void;
  setStatsOpen: (b: boolean) => void;
  setSettingsOpen: (b: boolean) => void;
}

const dailyIndex = useDailyIndex();
const existingGuesses = localStorage.getItem("prevGame") || "{}";
const pastGuesses = JSON.parse(existingGuesses);
const gameStateFinished =
  pastGuesses["pastOffset"] === dailyIndex &&
  (pastGuesses["gameState"] === "won" || pastGuesses["gameState"] === "lost");

const useDialogStore = create<DialogStore>((set) => ({
  isHelpOpen: !gameStateFinished,
  isStatsOpen: gameStateFinished,
  isSettingsOpen: false,
  setHelpOpen: (b: boolean) => set(() => ({ isHelpOpen: b })),
  setStatsOpen: (b: boolean) => set(() => ({ isStatsOpen: b })),
  setSettingsOpen: (b: boolean) => set(() => ({ isSettingsOpen: b })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Dialog Store", useDialogStore);

export default useDialogStore;
