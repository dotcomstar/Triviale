import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface CurrGuessStore {
  guess: string[];
  index: number;
  deleteChar: () => void;
  addChar: (char: string) => void;
  resetGuess: () => void;
}

const useCurrGuessStore = create<CurrGuessStore>((set) => ({
  guess: [],
  index: 0,
  deleteChar: () =>
    set((state) => ({
      guess: [...state.guess.filter((_, i) => i !== state.index - 1)],
      index: Math.max(0, state.index - 1),
    })),
  addChar: (char: string) =>
    set((state) => ({
      guess: [...state.guess, char],
      index: state.index + 1,
    })),
  resetGuess: () => set(() => ({ guess: [], index: 0 })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Current Guess Store", useCurrGuessStore);

export default useCurrGuessStore;
