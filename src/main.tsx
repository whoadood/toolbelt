import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./hooks/useTodos";
import { InputTodoProvider } from "./hooks/useInputTodo";
import { SpotifyProvider } from "./hooks/useSpotify";
import { PomodoroProvider } from "./hooks/usePomodoro";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <InputTodoProvider>
        <SpotifyProvider>
          <PomodoroProvider>
            <App />
          </PomodoroProvider>
        </SpotifyProvider>
      </InputTodoProvider>
    </TodoProvider>
  </React.StrictMode>
);
