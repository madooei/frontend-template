import { z } from "zod";

export const NoteSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export type NoteType = z.infer<typeof NoteSchema>;
