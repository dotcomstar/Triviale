import { QUESTIONS_PER_DAY } from "../constants/settings";
import questions from "../data/questions";

// 1 January 2023 Game Epoch
export const firstGameDate = new Date(2023, 0);
export const periodInDays = 1;
const oneDay = 1000 * 60 * 60 * 24; // One day Time in ms (milliseconds)
const presentDate = new Date();
// const presentDate = new Date(new Date().getTime() + oneDay); // Temp offset so new questions come the second day and not the first

const useDailyIndex = () => {
  const index: number = Math.floor(
    Math.round(firstGameDate.getTime() - presentDate.getTime()) / oneDay
  );
  const len = questions.length;
  const positiveModIndex = (((index * QUESTIONS_PER_DAY) % len) + len) % len;
  console.log(positiveModIndex);
  return positiveModIndex;
};

export default useDailyIndex;
