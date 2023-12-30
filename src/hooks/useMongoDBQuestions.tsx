import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { MondoDBQuestion } from "../data/questions";
import { oneDay } from "./useDailyIndex";
import useTodayAsInt from "./useTodayAsInt";

const today = useTodayAsInt();
console.log(`Today is ${today}`);

const useMongoDBQuestions = () =>
  useQuery<MondoDBQuestion[], Error>({
    queryKey: ["date", today],
    queryFn: () =>
      apiClient
        .get<MondoDBQuestion[]>("/questions", {
          params: {
            date: today,
          },
        })
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    staleTime: oneDay, // 1 day
  });

export default useMongoDBQuestions;
