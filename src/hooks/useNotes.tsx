import { createContext, useContext, useReducer, useRef } from "react";
import { Note } from "../types/global";

const NoteContext = createContext<
  | {
      notes: Note[];
      notesDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE =
  | {
      type: "ADD_NOTE" | "EDIT_NOTE";
      value: Note;
    }
  | {
      type: "DELETE_NOTE";
      value: string;
    }
  | {
      type: "RESET_NOTES";
      value: undefined;
    };
const storage = localStorage.getItem("notes-list");

const initialNotes: Note[] = [
  {
    id: "note1",
    text: "checkout the toggle menu in the upper left hand corner",
    startX: window.innerWidth < 1030 ? 40 : window.innerWidth < 810 ? 60 : 40,
    startY: window.innerWidth < 1030 ? 10 : 10,
  },
  {
    id: "note2",
    text: "paste a spotify playlist url slug, click the chevron to explore songs within a playlist",
    startX: window.innerWidth < 1030 ? 40 : window.innerWidth < 810 ? 60 : 720,
    startY: window.innerWidth < 1030 ? 10 : window.innerWidth < 810 ? 10 : 400,
  },
  {
    id: "note3",
    text: "customize your settings in the upper right hand corner",
    startX: window.innerWidth < 1030 ? 40 : window.innerWidth < 810 ? 60 : 720,
    startY: window.innerWidth < 1030 ? 10 : window.innerWidth < 810 ? 10 : 10,
  },
];

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const noteReducer = (state = initialNotes, action: REDUCER_ACTION_TYPE) => {
    switch (action.type) {
      case "ADD_NOTE":
        const newNotes = [...state, action.value];
        localStorage.setItem("notes-list", JSON.stringify(newNotes));
        return newNotes;
      case "EDIT_NOTE":
        const editNotes = state.map((td) =>
          td.id === action.value.id ? action.value : td
        );
        localStorage.setItem("notes-list", JSON.stringify(editNotes));
        return editNotes;
      case "DELETE_NOTE":
        const deleteNotes = state.filter((td) => td.id !== action.value);
        localStorage.setItem("notes-list", JSON.stringify(deleteNotes));
        return deleteNotes;
      case "RESET_NOTES":
        return initialNotes;
      default:
        return initialNotes;
    }
  };
  const [notes, notesDispatch] = useReducer(
    noteReducer,
    storage ? JSON.parse(storage) : initialNotes
  );

  const data = { notes, notesDispatch };

  return <NoteContext.Provider value={data}>{children}</NoteContext.Provider>;
};

const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { NoteProvider, useNotes };
