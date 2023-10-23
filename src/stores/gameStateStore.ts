import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GameStateStore {
  gameState: "won" | "lost" | "inProgress";
  questionNumber: number;
  guessNumber: number;
  moveToNextQuestion: () => void;
  guesses: [string[], string[], string[]];
}

const useGameStateStore = create<GameStateStore>((set) => ({
  gameState: "inProgress",
  questionNumber: 0,
  guessNumber: 0,
  moveToNextQuestion: () =>
    set((state) => ({
      questionNumber: state.questionNumber + 1,
      guessNumber: 0,
    })),
  guesses: [[] as string[], [] as string[], [] as string[]],
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Hard Mode Store", useGameStateStore);

export default useGameStateStore;
