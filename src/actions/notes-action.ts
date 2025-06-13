import { createNote } from "@/services/notes-api";
import { addNote } from "@/stores/notes-store";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const text = formData.get("text") as string;

  if (!text?.trim()) {
    return { error: "Note text is required" };
  }

  try {
    const newNote = await createNote({
      id: Date.now(),
      text: text.trim(),
    });

    // You can also update the store here if needed
    addNote(newNote);

    return { success: true, note: newNote };
  } catch (error) {
    return {
      error: "Failed to create note",
      cause: error,
    };
  }
}
