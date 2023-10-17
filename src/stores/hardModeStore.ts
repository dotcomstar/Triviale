import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface HardModeStore {
  hardMode: boolean;
  toggleHardMode: () => void;
}

const useHardModeStore = create<HardModeStore>((set) => ({
  hardMode: false,
  toggleHardMode: () => set((state) => ({ hardMode: !state.hardMode })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Hard Mode Store", useHardModeStore);

export default useHardModeStore;
