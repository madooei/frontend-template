import { persistentAtom } from "@nanostores/persistent";
import type { NoteType } from "@/types/note-types";

const DEBUG = false;

const defaultNotes: NoteType[] = [];
const storageKey = "notes";

export const $notes = persistentAtom<NoteType[]>(storageKey, defaultNotes, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function setNotes(notes: NoteType[]) {
  $notes.set(notes);
}

export function addNote(note: NoteType) {
  $notes.set([...$notes.get(), note]);
}

if (DEBUG) {
  import("@nanostores/logger").then(({ logger }) => {
    logger({ $notes });
  });
}
