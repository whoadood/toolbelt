import { createContext, Reducer, useContext, useReducer } from "react";
import { Todo } from "../types/global";

const TodoContext = createContext<
  | {
      todos: Todo[];
      todosDispatch: React.Dispatch<ReducerAction>;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE =
  | "ADD_TODO"
  | "COMPLETE_TODO"
  | "DELETE_TODO"
  | "RESET_TODO";

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  value?: Todo | string;
};

const initialTodos: Todo[] = [];

const ACTION_TYPE = {
  ADD_TODO: "ADD_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  DELETE_TODO: "DELETE_TODO",
  RESET_TODOS: "RESET_TODOS",
};

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const todoReducer: Reducer<Todo[], ReducerAction> = (
    state = initialTodos,
    action
  ) => {
    switch (action.type) {
      case ACTION_TYPE.ADD_TODO:
        return [...state, action.value];
      case ACTION_TYPE.COMPLETE_TODO:
        return state.map((td) => {
          if (td.text === action.value) {
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
      case ACTION_TYPE.DELETE_TODO:
        return state.filter((td) => td.text !== action.value);
      case ACTION_TYPE.RESET_TODOS:
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
