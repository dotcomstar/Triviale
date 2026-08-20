import useQuestions from "./useQuestions";

const useQuestionByID = (id: number) => {
  const { data } = useQuestions();
  return data[id];
};

export default useQuestionByID;
