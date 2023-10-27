import useQuestions from "./useQuestions";

const useQuestionByID = (id: number) => {
  const { data } = useQuestions();
  const dataPoint = data.find((_, i) => i === id);
  return dataPoint;
};

export default useQuestionByID;
