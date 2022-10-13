import { createContext, useContext, useReducer } from "react";
import { Todo } from "../types/global";

const TodoContext = createContext<
  | {
      todos: Todo[];
      todosDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE =
  | {
      type: "ADD_TODO" | "EDIT_TODO";
      value: Todo;
    }
  | {
      type: "COMPLETE_TODO" | "DELETE_TODO";
      value: string;
    }
  | {
      type: "RESET_TODOS";
      value: undefined;
    };

const initialTodos: Todo[] = [
  {
    id: "todo1",
    text: "Delete this",
    currentRound: 3,
    totalRounds: 3,
    complete: true,
  },
  {
    id: "todo2",
    text: "Complete this",
    currentRound: 2,
    totalRounds: 3,
    complete: false,
  },
  {
    id: "todo3",
    text: "Keep this",
    currentRound: 0,
    totalRounds: 1,
    complete: false,
  },
];

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const todoReducer = (state = initialTodos, action: REDUCER_ACTION_TYPE) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.value];
      case "COMPLETE_TODO":
        return state.map((td) => {
          if (td.id === action.value) {
            if (td.complete) {
              return { ...td, complete: false, currentRound: 0 };
            }
            if (td.currentRound === td.totalRounds - 1) {
              return {
                ...td,
                complete: !td.complete,
                currentRound: td.totalRounds,
              };
            }
            return { ...td, currentRound: td.currentRound + 1 };
          }
          return td;
        });
      case "EDIT_TODO":
        return state.map((td) =>
          td.id === action.value.id ? action.value : td
        );
      case "DELETE_TODO":
        return state.filter((td) => td.id !== action.value);
      case "RESET_TODOS":
        return initialTodos;
      default:
        return initialTodos;
    }
  };
  const [todos, todosDispatch] = useReducer(todoReducer, initialTodos);

  const data = { todos, todosDispatch };

  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return context;
};

export { TodoProvider, useTodos };
