import questions, { Question } from "../data/questions";

export type QuestionsResponse = {
  data: Question[];
};

const useQuestions = (): QuestionsResponse => ({
  data: questions,
});

export default useQuestions;
