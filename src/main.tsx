import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./hooks/useTodos";
import { InputTodoProvider } from "./hooks/useInputTodo";
import { SpotifyProvider } from "./hooks/useSpotify";
import { PomodoroProvider } from "./hooks/usePomodoro";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SettingsProvider } from "./hooks/useSettings";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <InputTodoProvider>
          <SpotifyProvider>
            <PomodoroProvider>
              <SettingsProvider>
                <App />
              </SettingsProvider>
            </PomodoroProvider>
          </SpotifyProvider>
        </InputTodoProvider>
      </TodoProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
