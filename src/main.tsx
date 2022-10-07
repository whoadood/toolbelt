import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./hooks/useTodos";
import { InputTodoProvider } from "./hooks/useInputTodo";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <InputTodoProvider>
        <App />
      </InputTodoProvider>
    </TodoProvider>
  </React.StrictMode>
);
