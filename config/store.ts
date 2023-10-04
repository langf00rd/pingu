import { StoreState } from "@/interface";
import { create } from "zustand";

export const useStore = create<StoreState>((set) => ({
  showMainAside: false,
  setShowMainAside: (showMainAside) => set(() => ({ showMainAside: showMainAside })),
}));
