import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "../constants/settings";

export type WinState = "won" | "lost" | "inProgress";

export interface GameStateImport {
  gameState: WinState;
  questionState: WinState[];
  questionNumber: number;
  guessNumber: number[];
  guesses: string[][][];
}

export interface GameStateStore extends GameStateImport {
  makeGuess: (guess: string[]) => void;
  cacheGuess: (guess: string[]) => void;
  moveToQuestion: (id: number) => void;
  moveToNextQuestion: () => void;
  winQuestion: (id: number) => void;
  loseQuestion: (id: number) => void;
  winGame: () => void;
  loseGame: () => void;
  importGame: (pastStore: GameStateImport) => void;
}

const useGameStateStore = create<GameStateStore>((set) => ({
  gameState: "inProgress",
  questionState: Array(QUESTIONS_PER_DAY).fill("inProgress"),
  questionNumber: 0,
  guessNumber: Array(QUESTIONS_PER_DAY).fill(0),
  guesses: Array(QUESTIONS_PER_DAY).fill(Array(MAX_CHALLENGES).fill([])),
  winGame: () => {
    console.log("Won the game");
    set(() => ({ gameState: "won" }));
  },
  loseGame: () => {
    console.log("Lost the game");
    set(() => ({ gameState: "lost" }));
  },
  winQuestion: (id: number) => {
    console.log("Correct!");
    set((state) => ({
      questionState: [
        ...state.questionState.map((s, i) => (i === id ? "won" : s)),
      ],
    }));
  },
  loseQuestion: (id: number) => {
    console.log("Lost the question :(");
    set((state) => ({
      questionState: [
        ...state.questionState.map((s, i) => (i === id ? "lost" : s)),
      ],
    }));
  },
  moveToQuestion: (id: number) =>
    set(() => ({
      questionNumber: id,
    })),
  moveToNextQuestion: () =>
    set((state) => ({
      questionNumber: state.questionState.indexOf("inProgress"),
    })),
  makeGuess: (guess: string[]) => {
    set((state) => ({
      guessNumber: [
        ...state.guessNumber.map((num, i) =>
          i === state.questionNumber ? num + 1 : num
        ),
      ],
      guesses: [
        ...state.guesses.map((val, i) =>
          i === state.questionNumber
            ? val.map((g, ig) =>
                ig === state.guessNumber[state.questionNumber] ? guess : g
              )
            : val
        ),
      ],
    }));
  },
  cacheGuess: (guess: string[]) => {
    set((state) => ({
      guesses: [
        ...state.guesses.map((val, i) =>
          i === state.questionNumber
            ? val.map((g, ig) =>
                ig === state.guessNumber[state.questionNumber] ? guess : g
              )
            : val
        ),
      ],
    }));
  },
  importGame: (pastStore: GameStateImport) => {
    set(() => ({
      gameState: pastStore.gameState,
      questionState: pastStore.questionState,
      questionNumber: pastStore.questionNumber,
      guessNumber: pastStore.guessNumber,
      guesses: pastStore.guesses,
    }));
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Game State Store", useGameStateStore);

export default useGameStateStore;
