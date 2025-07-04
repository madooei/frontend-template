import type { NoteType } from "@/types/note-types";
import { useLoaderData } from "react-router";
import { Typography } from "@madooei/typography";

const NotesPage: React.FC = () => {
  const { notes } = useLoaderData<{ notes: NoteType[] }>();

  return (
    <Typography>
      <h3>Notes!</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.text}</li>
        ))}
      </ul>
    </Typography>
  );
};

export default NotesPage;
