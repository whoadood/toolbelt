import React, { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Note } from "../types/global";

export default function NoteBody({ note }: { note: Note }) {
  const [noteInput, setNoteInput] = useState(note.text);
  const { notesDispatch } = useNotes();
  return (
    <div className="min-h-[100px] min-w-[300px] p-2">
      <textarea
        onBlur={(e) => {
          if (noteInput !== note.text) {
            notesDispatch({
              type: "EDIT_NOTE",
              value: {
                ...note,
                text: noteInput,
              },
            });
          }
        }}
        rows={4}
        onChange={(e) => {
          setNoteInput(e.currentTarget.value);
        }}
        className="h-full w-full resize-none rounded bg-black/0 py-1 px-2 font-[cursive] text-lg font-normal outline-none hover:bg-black/75 focus:bg-black/75 focus:outline-white"
        value={noteInput}
      />
    </div>
  );
}
