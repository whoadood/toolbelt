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

const initialNotes: Note[] = [
  {
    id: "note1",
    text: "checkout the toggle menu in the upper left hand corner",
    startX: window.innerWidth < 800 ? 60 : 40,
    startY: 10,
  },
  {
    id: "note2",
    text: "paste a spotify playlist url slug, click the chevron to explore songs within a playlist",
    startX: window.innerWidth < 800 ? 60 : 720,
    startY: window.innerWidth < 800 ? 10 : 400,
  },
  {
    id: "note3",
    text: "customize your settings in the upper right hand corner",
    startX: window.innerWidth < 800 ? 60 : 720,
    startY: window.innerWidth < 800 ? 10 : 10,
  },
];

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const noteReducer = (state = initialNotes, action: REDUCER_ACTION_TYPE) => {
    switch (action.type) {
      case "ADD_NOTE":
        console.log("add note reducer");
        return [...state, action.value];
      case "EDIT_NOTE":
        return state.map((td) =>
          td.id === action.value.id ? action.value : td
        );
      case "DELETE_NOTE":
        return state.filter((td) => td.id !== action.value);
      case "RESET_NOTES":
        return initialNotes;
      default:
        return initialNotes;
    }
  };
  const [notes, notesDispatch] = useReducer(noteReducer, initialNotes);

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