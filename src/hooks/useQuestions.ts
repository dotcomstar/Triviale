import questions, { Question } from "../data/questions";
import { logger } from "../utils/logger";
// MongoDB integration is currently disabled
// import useRetrievedStore from "../stores/retrievedStore";
// import useMongoDBQuestions from "./useMongoDBQuestions";

export type QuestionsResponse = {
  data: Question[];
};

const useQuestions = (questionID?: string): QuestionsResponse => {
  if (questionID) {
    logger.debug("Question ID:", questionID);
  }

  // Using local questions data
  // MongoDB integration can be re-enabled by uncommenting the code below
  return { data: questions };

  /* MongoDB Integration (currently disabled):
  const setRetrieved = useRetrievedStore((s) => s.setRetrieved);
  const { data: mongoQuestionsArray } = useMongoDBQuestions(questionID);
  let mongoData = null;
  if (mongoQuestionsArray) {
    mongoData = mongoQuestionsArray[0];
  }

  if (mongoData) {
    logger.info("Successfully retrieved questions using MongoDB.");
    setRetrieved(true);
    return { data: mongoData.questions };
  } else {
    logger.info("Unable to get MongoDB data. Using local questions backup.");
    return {
      data: questions,
    };
  }
  */
};

export default useQuestions;
