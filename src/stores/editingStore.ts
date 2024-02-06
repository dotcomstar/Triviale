import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface EditingStore {
  editing: boolean;
  setEditing: (b: boolean) => void;
}

const useEditingStore = create<EditingStore>((set) => ({
  editing: false,
  setEditing: (b: boolean) => set(() => ({ editing: b })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Editing-state store", useEditingStore);

export default useEditingStore;
