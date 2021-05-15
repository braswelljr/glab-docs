import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    theme: `light`,
    setTheme: color => set({ theme: color })
  }))
);

export default useStore;
