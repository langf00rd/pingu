import { StoreState } from "@/interface";
import { create } from "zustand";

export const useStore = create<StoreState>((set) => ({
  showMainAside: false,
  showWriteAside: false,
  setShowMainAside: (showMainAside) => set(() => ({ showMainAside: showMainAside })),
  setShowWriteAside: (showWriteAside) => set(() => ({ showWriteAside: showWriteAside })),
}));
