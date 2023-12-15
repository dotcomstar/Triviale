// 13 December 2023 Game Epoch
const presentDate = new Date(new Date().getTime());
const dayDigits = 2;
const monthDigits = 2;

const useTodayAsInt = () => {
  // Offset digits so we can get date int in the form YYYYMMDD
  const year = presentDate.getFullYear() * 10 ** (dayDigits + monthDigits);
  const month = (presentDate.getMonth() + 1) * 10 ** dayDigits;
  const day = presentDate.getDate();
  return year + month + day;
};

export default useTodayAsInt;
