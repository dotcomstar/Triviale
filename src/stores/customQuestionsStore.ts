import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { Question } from "../data/questions";

interface CustomQuestionsStore {
  customQuestions: Question[];
  removeQuestion: (index: number) => void;
  addQuestion: (question: Question) => void;
  setQuestion: (question: Question, index: number) => void;
  resetQuestions: () => void;
}

const defaultQuestions: Question[] = [
  {
    question: "",
    answer: "",
    category: "ANY",
    altAnswer: [],
  },
  {
    question: "",
    answer: "",
    category: "ANY",
    altAnswer: [],
  },
  {
    question: "",
    answer: "",
    category: "ANY",
    altAnswer: [],
  },
];

const useCustomQuestionsStore = create<CustomQuestionsStore>((set) => ({
  addQuestion: (question) =>
    set((store) => ({ customQuestions: [...store.customQuestions, question] })),
  removeQuestion: (index) =>
    set((store) => ({
      customQuestions: store.customQuestions.filter((_, i) => i === index),
    })),
  setQuestion: (question, index) =>
    set((store) => ({
      customQuestions: store.customQuestions.map((c, i) =>
        index === i ? question : c
      ),
    })),
  resetQuestions: () =>
    set(() => ({
      customQuestions: defaultQuestions,
    })),
  customQuestions: defaultQuestions,
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Custom Questions Store", useCustomQuestionsStore);

export default useCustomQuestionsStore;
