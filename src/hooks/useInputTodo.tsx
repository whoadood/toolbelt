import React, { createContext, useContext } from "react";
import useToggle from "./useToggle";

const InputTodoContext = createContext<
  | {
      toggle: boolean;
      handleToggle: () => void;
    }
  | undefined
>(undefined);

const InputTodoProvider = ({ children }: { children: React.ReactNode }) => {
  const inputTodoToggler = useToggle();
  return (
    <InputTodoContext.Provider value={inputTodoToggler}>
      {children}
    </InputTodoContext.Provider>
  );
};

const useInputTodo = () => {
  const context = useContext(InputTodoContext);
  if (context === undefined) {
    throw new Error("useInputTodo can only be used inside InputTodoProvider");
  }
  return context;
};

export { useInputTodo, InputTodoProvider };
