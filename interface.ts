import { IBlog, IPost } from "./types";

export interface StoreState extends StoreAction {
  showMainAside: boolean;
  showWriteAside: boolean;
}

export interface StoreAction {
  setShowMainAside: (showMainAside: StoreState["showMainAside"]) => void;
  setShowWriteAside: (showWriteAside: StoreState["showWriteAside"]) => void;
}

export interface IWindow {
  width: number;
  height: number;
}

export interface BlogProps extends IBlog {
  posts: IPost[];
}
