import { z } from "zod";
import {
  editorContentSchema,
  blogSchema,
  postSchema,
  formPostSchema,
} from "./lib/schema";

export type IBlog = z.infer<typeof blogSchema>;
export type IPost = z.infer<typeof postSchema>;
export type JSONContent = z.infer<typeof editorContentSchema>;
export type FormPost = z.infer<typeof formPostSchema>;

export type IServerSideProps = {
  params: Record<string, string>;
  searchParams: { [key: string]: string | string[] | undefined };
};
