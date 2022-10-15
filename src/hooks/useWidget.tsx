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

  const inspirationToggle = useToggle(
    inspirationStorage ? !!inspirationStorage : undefined
  );
  const todolistToggle = useToggle(todoStorage ? !!todoStorage : undefined);
  const pomodoroToggle = useToggle(
    pomodoroStorage ? !!pomodoroStorage : undefined
  );
  const spotifyToggle = useToggle(
    spotifyStorage ? !!spotifyStorage : undefined
  );

  console.log("use widget todolist storage", !!todoStorage);
  console.log("use widget todolist toggle", todolistToggle.toggle);
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
