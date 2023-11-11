import { QUESTIONS_PER_DAY } from "../constants/settings";
import questions from "../data/questions";

// 26 October 2023 Game Epoch
export const firstGameDate = new Date(2023, 10, 3);
export const periodInDays = 1;
const oneDay = 1000 * 60 * 60 * 24; // One day Time in ms (milliseconds)
// const presentDate = new Date();
const presentDate = new Date(new Date().getTime() + 0 * oneDay); // Temp offset so new questions come the second day and not the first

const len = questions.length;

export const getPositiveIndex = (index: number) => {
  return ((index % len) + len) % len;
};

const useDailyIndex = () => {
  const index: number = Math.floor(
    Math.round(firstGameDate.getTime() - presentDate.getTime()) / oneDay
  );
  return index * QUESTIONS_PER_DAY;
};

export default useDailyIndex;
