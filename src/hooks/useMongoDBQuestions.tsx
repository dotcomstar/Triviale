import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { MondoDBQuestion } from "../data/questions";
import { oneDay } from "./useDailyIndex";
import useTodayAsInt from "./useTodayAsInt";

const today = useTodayAsInt();
console.log(`Today is ${today}`);

const useMongoDBQuestions = (questionID?: string) =>
  useQuery<MondoDBQuestion[], Error>({
    queryKey: questionID ? ["questionID", questionID] : ["date", today],
    queryFn: () =>
      apiClient
        .get<MondoDBQuestion[]>("/questions", {
          params: {
            date: questionID ? questionID : today,
          },
        })
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    staleTime: oneDay, // 1 day
  });

export default useMongoDBQuestions;
