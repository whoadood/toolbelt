import { createContext, useContext, useReducer } from "react";
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

const initialNotes: Note[] = [];

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const noteReducer = (state = initialNotes, action: REDUCER_ACTION_TYPE) => {
    switch (action.type) {
      case "ADD_NOTE":
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
