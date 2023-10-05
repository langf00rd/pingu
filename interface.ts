import { IBlog } from "./types";

export interface StoreState extends StoreAction {
  showMainAside: boolean;
}

export interface StoreAction {
  setShowMainAside: (mainView: StoreState["showMainAside"]) => void;
}

export interface IWindow {
  width: number;
  height: number;
}

export interface BlogProps extends IBlog {
  posts: [];
}
