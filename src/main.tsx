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
import { VisibilityProvider } from "./hooks/useWidget";
import { NoteProvider } from "./hooks/useNotes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <InputTodoProvider>
          <SpotifyProvider>
            <PomodoroProvider>
              <NoteProvider>
                <SettingsProvider>
                  <VisibilityProvider>
                    <App />
                  </VisibilityProvider>
                </SettingsProvider>
              </NoteProvider>
            </PomodoroProvider>
          </SpotifyProvider>
        </InputTodoProvider>
      </TodoProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
