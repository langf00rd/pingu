import { z } from "zod";
import { blogSchema } from "./lib/schema";
export type Blog = z.infer<typeof blogSchema>;
