import type { NoteType } from "@/types/note-types";
import { env } from "@/env";

const getNotes = async (): Promise<NoteType[]> => {
  const response = await fetch(`${env.API_URL}/notes`);
  return response.json();
};

const createNote = async (note: NoteType): Promise<NoteType> => {
  const response = await fetch(`${env.API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export { getNotes, createNote };
