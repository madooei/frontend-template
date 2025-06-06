import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export type PostType = z.infer<typeof PostSchema>;
