import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GridStore {
  grid: string[][];
  currentRow: number;
  goToNextRow: () => void;
  // addLetter: (c: string) => void;
}

const useGridStore = create<GridStore>((set) => ({
  grid: Array(Array(10)),
  currentRow: 0,
  goToNextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
  //   addLetter: (c: string) => set((state) => ({})),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Grid Store", useGridStore);

export default useGridStore;
