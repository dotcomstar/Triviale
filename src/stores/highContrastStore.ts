import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface HighContrastStore {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const useHighContrastStore = create<HighContrastStore>((set) => ({
  highContrast: localStorage.getItem("highContrast") === "true",
  toggleHighContrast: () => {
    set((state) => {
      localStorage.setItem("highContrast", (!state.highContrast).toString());
      return { highContrast: !state.highContrast };
    });
  },
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("High Contrast Store", useHighContrastStore);

export default useHighContrastStore;
