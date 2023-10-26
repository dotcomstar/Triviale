import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "../constants/settings";

export type WinState = "won" | "lost" | "inProgress";

interface GameStateStore {
  gameState: WinState;
  questionState: WinState[];
  questionNumber: number;
  guessNumber: number;
  makeGuess: (guess: string[]) => void;
  moveToQuestion: (id: number) => void;
  moveToNextQuestion: () => void;
  winQuestion: (id: number) => void;
  loseQuestion: (id: number) => void;
  winGame: () => void;
  loseGame: () => void;
  guesses: string[][][];
}

const useGameStateStore = create<GameStateStore>((set) => ({
  gameState: "inProgress",
  questionState: Array(QUESTIONS_PER_DAY).fill("inProgress"),
  questionNumber: 0,
  guessNumber: 0,
  guesses: [
    Array(MAX_CHALLENGES).fill([]),
    Array(MAX_CHALLENGES).fill([]),
    Array(MAX_CHALLENGES).fill([]),
  ],
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
    set((state) => ({
      questionNumber: id,
      guessNumber: state.guesses[id].reduce(
        (acc, guess) => (acc + guess.length > 0 ? 1 : 0),
        0
      ),
    })),
  moveToNextQuestion: () =>
    set((state) => ({
      questionNumber: state.questionState.indexOf("inProgress"),
      guessNumber: state.guesses[
        state.questionState.indexOf("inProgress")
      ].reduce((acc, guess) => (acc + guess.length > 0 ? 1 : 0), 0),
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
