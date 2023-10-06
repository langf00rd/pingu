import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  uid: z.string(),
  subdomain: z.string(),
  owner: z.string(),
  banner: z.string().optional(),
  theme_id: z.string().optional(),
  theme_color: z.string().optional(),
});

export const editorContentSchema = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any()).optional(),
  content: z.array(z.record(z.any())).optional(),
  marks: z
    .array(
      z.object({
        type: z.string(),
        attrs: z.record(z.any()).optional(),
      })
    )
    .optional(),
  text: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string(),
  url: z.string(),
  id: z.string(),
  parent_id: z.string(),
  subdomain: z.string(),
  owner: z.string().optional(),
  banner: z.string().optional(),
  content_html: z.string(),
  content_json: editorContentSchema,
});
