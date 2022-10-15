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
  const inspirationStorage = localStorage.getItem("inspiration-vis");
  const todoStorage = localStorage.getItem("todo-vis");
  const pomodoroStorage = localStorage.getItem("pomodoro-vis");
  const spotifyStorage = localStorage.getItem("spotify-vis");

  // pass these init parameter from local storage does not work?
  const inspirationToggle = useToggle(
    inspirationStorage ? JSON.parse(inspirationStorage) : undefined
  );
  const todolistToggle = useToggle(
    todoStorage ? JSON.parse(todoStorage) : undefined
  );
  const pomodoroToggle = useToggle(
    pomodoroStorage ? JSON.parse(pomodoroStorage) : undefined
  );
  const spotifyToggle = useToggle(
    spotifyStorage ? JSON.parse(spotifyStorage) : undefined
  );

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
