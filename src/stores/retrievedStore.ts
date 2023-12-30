import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface RetrievedStore {
  retrieved: boolean;
  setRetrieved: (b: boolean) => void;
}

const useRetrievedStore = create<RetrievedStore>((set) => ({
  retrieved: false,
  setRetrieved: (b: boolean) => set(() => ({ retrieved: b })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Retrieved from DynamoDB Store", useRetrievedStore);

export default useRetrievedStore;
