import questions, { Question } from "../data/questions";

export type QuestionsResponse = {
  data: Question[];
};

const useQuestions = (): QuestionsResponse => {
  return { data: questions };
  // // Try to get questions with MongoDB API.
  // const setRetrieved = useRetrievedStore((s) => s.setRetrieved);
  // const { data: mongoQuestionsArray } = useMongoDBQuestions();
  // let mongoData = null;
  // if (mongoQuestionsArray) {
  //   mongoData = mongoQuestionsArray[0];
  // }

  // if (mongoData) {
  //   // Successfully retrieved questions using MongoDB API.
  //   console.log("Successfully retrieved questions using MongoDB.");
  //   setRetrieved(true);
  //   return { data: mongoData.questions };
  // } else {
  //   // We were not able to get questions for today.
  //   console.log("Unable to get MongoDB data. Using local questions backup.");
  //   return {
  //     data: questions,
  //   };
  // }
};

export default useQuestions;
