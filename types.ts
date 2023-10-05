import { z } from "zod";
import { blogSchema } from "./lib/schema";

export type IBlog = z.infer<typeof blogSchema>;

export type BlogServerSideProps = {
  params: { domain: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
