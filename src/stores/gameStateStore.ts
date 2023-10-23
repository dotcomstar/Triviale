import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface GameStateStore {
  gameState: "won" | "lost" | "inProgress";
  questionNumber: number;
  guessNumber: number;
  makeGuess: (guess: string) => void;
  moveToNextQuestion: () => void;
  guesses: string[][];
}

const useGameStateStore = create<GameStateStore>((set) => ({
  gameState: "inProgress",
  questionNumber: 0,
  guessNumber: 0,
  guesses: [[] as string[], [] as string[], [] as string[]],
  moveToNextQuestion: () =>
    set((state) => ({
      questionNumber: state.questionNumber + 1,
      guessNumber: 0,
    })),
  makeGuess: (guess: string) => {
    set((state) => ({
      guessNumber: state.guessNumber + 1,
      guesses: state.guesses.map((a, i) =>
        i === state.questionNumber
          ? a.map((g, ig) => (ig === state.guessNumber ? guess : g))
          : a
      ),
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Game State Store", useGameStateStore);

export default useGameStateStore;
