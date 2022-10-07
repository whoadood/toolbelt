import { useReducer } from "react";
type Todo = {
  id?: string;
  text: string;
  currentRound: number;
  complete: boolean;
  totalRounds: number;
};

const initialTodos: Todo[] = [];

const ACTION_TYPE = {
  ADD: "ADD_TODO",
  COMPLETE: "UPDATE_TODO_ROUND",
  DELETE: "DELETE_TODO",
  RESET: "RESET_TODOS",
};

const reducer = (
  state: typeof initialTodos,
  action: {
    type: "ADD_TODO" | "UPDATE_TODO_ROUND" | "DELETE_TODO" | "RESET_TODO";
    value: Todo | string;
  }
) => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
      return [...state, action.value];
      break;
    case ACTION_TYPE.COMPLETE:
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
      break;
    case ACTION_TYPE.DELETE:
      return state.filter((td) => td.text !== action.value);
    case ACTION_TYPE.RESET:
      return initialTodos;
    default:
      return initialTodos;
  }
};
const TodoReducer = () => {
  const [todos, dispatch] = useReducer<
    (
      state: typeof initialTodos,
      action: {
        type: "ADD_TODO" | "UPDATE_TODO_ROUND" | "DELETE_TODO" | "RESET_TODO";
        value: Todo | string;
      }
    ) => (string | Todo)[],
    {
      type: "ADD_TODO" | "UPDATE_TODO_ROUND" | "DELETE_TODO" | "RESET_TODO";
      value: Todo | string;
    }
  >(reducer, initialTodos);

  return { todos, dispatch, ACTION_TYPE };
};
