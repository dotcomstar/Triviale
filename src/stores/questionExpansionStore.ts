import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface QuestionExpansionStore {
  questionExpansion: number;
  expandQuestion: () => void;
  resetQuestionExpansion: () => void;
}

const useQuestionExpansionStore = create<QuestionExpansionStore>((set) => ({
  questionExpansion: 1,
  expandQuestion: () =>
    set((state) => ({ questionExpansion: state.questionExpansion + 1 })),
  resetQuestionExpansion: () => set(() => ({ questionExpansion: 1 })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Question Expansion Store", useQuestionExpansionStore);

export default useQuestionExpansionStore;
