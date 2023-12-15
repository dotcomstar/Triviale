import questions, { Question } from "../data/questions";
import useMongoDBQuestions from "./useMongoDBQuestions";

export type QuestionsResponse = {
  data: Question[];
};

const useQuestions = (): QuestionsResponse => {
  // Try to get questions with MongoDB API
  const { data: mongoQuestionsArray } = useMongoDBQuestions();
  let mongoData = null;
  if (mongoQuestionsArray) {
    mongoData = mongoQuestionsArray[0];
  }

  if (mongoData) {
    // Successfully retrieved questions using MongoDB API.
    return { data: mongoData.questions };
  } else {
    // We were not able to get questions for today.
    console.log("Unable to get MongoDB data. Using local questions backup.");
    return {
      data: questions,
    };
  }
};

export default useQuestions;
