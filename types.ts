import { z } from "zod";
import { editorContentSchema, blogSchema, postSchema } from "./lib/schema";

export type IBlog = z.infer<typeof blogSchema>;
export type IPost = z.infer<typeof postSchema>;
export type JSONContent = z.infer<typeof editorContentSchema>;

export type BlogServerSideProps = {
  params: Record<string, string>;
  searchParams: { [key: string]: string | string[] | undefined };
};
