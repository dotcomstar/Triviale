import useQuestions from "./useQuestions";

const useQuestionByID = (id: number) => {
  const { data } = useQuestions();
  const dataPoint = data.find((d) => d.questionId === id);
  return dataPoint;
};

export default useQuestionByID;
