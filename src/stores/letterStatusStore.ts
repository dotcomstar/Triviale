import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type Status = "absent" | "present" | "correct" | undefined;

type StatusIndex = [questionNum: number, letter: string, position: number];

class LetterStatus {
  [index: StatusIndex]: Status;
}

interface LetterStatusStore {
  statuses: Map<
    [questionNum: number, letter: string, position: number],
    Status
  >;
  setStatus: (questionNum: number, char: string, pos: number) => void;
}

const useLetterStatusStore = create<LetterStatusStore>((set) => ({
  statuses: new Map(),
  setStatus: (questionNum: number, char: string, pos: number) =>
    set((state) => ({
      statuses: state.statuses,
    })),
  //   statuses: () => set(() => ({ user: "" })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Letter Status Store", useLetterStatusStore);

export default useLetterStatusStore;
