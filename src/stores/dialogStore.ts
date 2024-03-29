import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

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

const useDialogStore = create<DialogStore>((set) => ({
  isHelpOpen: false,
  isStatsOpen: false,
  isSettingsOpen: false,
  isLandingOpen: true,
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
