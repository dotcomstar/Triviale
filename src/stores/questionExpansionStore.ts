import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface QuestionExpansionStore {
  questionExpansion: number;
  expandQuestion: () => void;
  resetQuestion: () => void;
}

const useQuestionExpansionStore = create<QuestionExpansionStore>((set) => ({
  questionExpansion: 1,
  expandQuestion: () =>
    set((state) => ({ questionExpansion: state.questionExpansion + 1 })),
  resetQuestion: () => set(() => ({ questionExpansion: 1 })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Question Expansion Store", useQuestionExpansionStore);

export default useQuestionExpansionStore;