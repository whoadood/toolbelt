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
    <TodoProvider>
      <InputTodoProvider>
        <SpotifyProvider>
          <PomodoroProvider>
            <SettingsProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </SettingsProvider>
          </PomodoroProvider>
        </SpotifyProvider>
      </InputTodoProvider>
    </TodoProvider>
  </React.StrictMode>
);
