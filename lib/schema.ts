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
