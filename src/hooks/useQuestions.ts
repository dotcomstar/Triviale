import questions from "../data/questions";

interface Question {
  questionId: number;
  question: string;
  answer: string;
  fullAnswer?: string;
  url: string;
  category: string;
}

export type QuestionsResponse = {
  data: Question[];
};

const useQuestions = (): QuestionsResponse => ({
  data: questions,
});

export default useQuestions;
