import React, { createContext, useContext } from "react";
import useToggle from "./useToggle";

const VisibilityContext = createContext<
  | {
      inspirationToggle: {
        toggle: boolean;
        handleToggle: () => void;
      };
      todolistToggle: {
        toggle: boolean;
        handleToggle: () => void;
      };
      pomodoroToggle: {
        toggle: boolean;
        handleToggle: () => void;
      };
      spotifyToggle: {
        toggle: boolean;
        handleToggle: () => void;
      };
    }
  | undefined
>(undefined);

const VisibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const inspirationToggle = useToggle();
  const todolistToggle = useToggle();
  const pomodoroToggle = useToggle();
  const spotifyToggle = useToggle();
  const data = {
    inspirationToggle,
    todolistToggle,
    pomodoroToggle,
    spotifyToggle,
  };
  return (
    <VisibilityContext.Provider value={data}>
      {children}
    </VisibilityContext.Provider>
  );
};

const useWidget = () => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error("useInputTodo can only be used inside InputTodoProvider");
  }
  return context;
};

export { useWidget, VisibilityProvider };
