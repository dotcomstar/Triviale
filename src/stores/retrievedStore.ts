import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface RetrievedStore {
  retrieved: boolean;
  questionID?: string;
  setRetrieved: (b: boolean) => void;
  setQuestionID: (id: string) => void;
}

const useRetrievedStore = create<RetrievedStore>((set) => ({
  retrieved: false,
  questionID: undefined,
  setRetrieved: (b: boolean) => set(() => ({ retrieved: b })),
  setQuestionID: (id: string) => set(() => ({ questionID: id })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Retrieved from DynamoDB Store", useRetrievedStore);

export default useRetrievedStore;
