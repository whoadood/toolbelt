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
      type: "ADD_TODO";
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

const initialTodos: Todo[] = [];

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
