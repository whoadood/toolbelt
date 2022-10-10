import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./hooks/useTodos";
import { InputTodoProvider } from "./hooks/useInputTodo";
import { SpotifyProvider } from "./hooks/useSpotify";
import { PomodoroProvider } from "./hooks/usePomodoro";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <InputTodoProvider>
        <SpotifyProvider>
          <PomodoroProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </PomodoroProvider>
        </SpotifyProvider>
      </InputTodoProvider>
    </TodoProvider>
  </React.StrictMode>
);
