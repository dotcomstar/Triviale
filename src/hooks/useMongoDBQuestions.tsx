import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { MondoDBQuestion } from "../data/questions";
import useDailyIndex from "./useDailyIndex";

const useMongoDBQuestions = (courseName: string) =>
  useQuery<MondoDBQuestion, Error>({
    queryKey: ["date", useDailyIndex()],
    queryFn: () =>
      apiClient
        .get<MondoDBQuestion>("/questions", {
          params: {
            name: courseName,
          },
        })
        .then((res) => res.data),
    enabled: !!courseName,
    refetchOnWindowFocus: false,
    staleTime: 2 * 7 * 24 * 60 * 60 * 1000, // 2w
  });

export default useMongoDBQuestions;
