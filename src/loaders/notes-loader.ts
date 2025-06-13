import { getNotes } from "@/services/notes-api";
import { setNotes } from "@/stores/notes-store";

export async function loader() {
  const notes = await getNotes();

  // In case you want to cache the data in the store, you can do it here.
  setNotes(notes);
  
  return { notes };
}
