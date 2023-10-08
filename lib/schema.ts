import { z } from "zod";

export const blogSchema = z.object({
  id: z.string(),
  sub_domain: z.string(),
  owner: z.string(),
  name: z.string(),
  custom_domain: z.string().optional(),
  disable_comments: z.boolean().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  theme: z.string().optional(),
  show_stats: z.boolean().optional(),
  custom_css: z.string().optional(),
  theme_color: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  banner: z.string().optional(),
  description: z.string().optional(),
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
  id: z.string(),
  title: z.string(),
  sub_title: z.string(),
  tags: z.array(z.string()),
  sub_domain: z.string(),
  parent_id: z.string(),
  slug: z.string(),
  content_html: z.string(),
  content_json: editorContentSchema,
  show_stats: z.boolean().optional(),
  banner: z.string().optional(),
  show_toc: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  is_published: z.boolean(),
  meta: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
  }),
  author: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      photo: z.string(),
    })
    .optional(),
});

// a copy of `postSchema` with only reqquired fields for form validation
export const formPostSchema = z.object({
  show_toc: postSchema.shape.show_toc,
  show_stats: postSchema.shape.show_stats,
  meta: postSchema.shape.meta,
  banner: postSchema.shape.banner,
});
