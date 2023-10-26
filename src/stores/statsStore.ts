import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface StatsStore {
  statsOpen: boolean;
  openStats: () => void;
  closeStats: () => void;
}

const useStatsStore = create<StatsStore>((set) => ({
  statsOpen: false,
  openStats: () => set(() => ({ statsOpen: true })),
  closeStats: () => set(() => ({ statsOpen: false })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Stats Store", useStatsStore);

export default useStatsStore;
