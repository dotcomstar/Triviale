import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface DialogStore {
  isHelpOpen: boolean;
  isStatsOpen: boolean;
  isSettingsOpen: boolean;
  setHelpOpen: (b: boolean) => void;
  setStatsOpen: (b: boolean) => void;
  setSettingsOpen: (b: boolean) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  isHelpOpen: true,
  isStatsOpen: false,
  isSettingsOpen: false,
  setHelpOpen: (b: boolean) => set(() => ({ isHelpOpen: b })),
  setStatsOpen: (b: boolean) => set(() => ({ isStatsOpen: b })),
  setSettingsOpen: (b: boolean) => set(() => ({ isSettingsOpen: b })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Dialog Store", useDialogStore);

export default useDialogStore;
