import questions from "../data/questions";

// 1 January 2023 Game Epoch
export const firstGameDate = new Date(2023, 0);
export const periodInDays = 1;
const oneDay = 1000 * 60 * 60 * 24; // One day Time in ms (milliseconds)
const presentDate = new Date(); // To set present_dates to two variables
// const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const useDailyIndex = () => {
  const index: number = Math.floor(
    Math.round(firstGameDate.getTime() - presentDate.getTime()) / oneDay
  );
  const len = questions.length;
  const positiveModIndex = (((index * 3) % len) + len) % len;
  return positiveModIndex;
};

export default useDailyIndex;
