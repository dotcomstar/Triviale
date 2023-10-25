import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES } from "../constants/settings";

type WinState = "won" | "lost" | "inProgress";

interface GameStateStore {
  gameState: WinState;
  questionState: WinState;
  questionNumber: number;
  guessNumber: number;
  makeGuess: (guess: string[]) => void;
  moveToNextQuestion: () => void;
  winQuestion: () => void;
  loseQuestion: () => void;
  resetQuestion: () => void;
  winGame: () => void;
  loseGame: () => void;
  guesses: string[][][];
}

const useGameStateStore = create<GameStateStore>((set) => ({
  gameState: "inProgress",
  questionState: "inProgress",
  questionNumber: 0,
  guessNumber: 0,
  guesses: [
    Array(MAX_CHALLENGES).fill([]),
    Array(MAX_CHALLENGES).fill([]),
    Array(MAX_CHALLENGES).fill([]),
  ],
  winGame: () => set(() => ({ gameState: "won" })),
  loseGame: () => set(() => ({ gameState: "lost" })),
  winQuestion: () => set(() => ({ questionState: "won" })),
  loseQuestion: () => set(() => ({ questionState: "lost" })),
  resetQuestion: () => set(() => ({ questionState: "inProgress" })),
  moveToNextQuestion: () =>
    set((state) => ({
      questionNumber: state.questionNumber + 1,
      guessNumber: 0,
    })),
  makeGuess: (guess: string[]) => {
    set((state) => ({
      guessNumber: state.guessNumber + 1,
      guesses: [
        ...state.guesses.map((val, i) =>
          i === state.questionNumber
            ? val.map((g, ig) => (ig === state.guessNumber ? guess : g))
            : val
        ),
      ],
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Game State Store", useGameStateStore);

export default useGameStateStore;
