import { PlusIcon } from "@heroicons/react/24/outline";
import React, { MutableRefObject, useRef, useState } from "react";
import { useInputTodo } from "../hooks/useInputTodo";
import useTodoRounds from "../hooks/useTodoRounds";
import { useTodos } from "../hooks/useTodos";
import TodoInput from "./TodoInput";

export default function TodoTitle({
  todoRef,
}: {
  todoRef: MutableRefObject<HTMLInputElement>;
}) {
  const { todosDispatch } = useTodos();
  const { toggle: inputToggle, handleToggle } = useInputTodo();
  const { rounds, addRound, subRound, resetRounds } = useTodoRounds();

  const reset = () => {
    handleToggle();
    resetRounds();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todosDispatch({
      type: "ADD_TODO",
      value: {
        text: todoRef.current.value,
        complete: false,
        currentRound: 0,
        totalRounds: rounds,
      },
    });
    reset();
  };

  return (
    <div>
      {inputToggle ? (
        <form
          className="flex flex-no-wrap"
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSubmit(e);
            }
            if (e.code === "Escape") {
              reset();
              handleToggle();
            }
          }}
        >
          <TodoInput
            todoRef={todoRef}
            rounds={rounds}
            addRound={addRound}
            subRound={subRound}
          />
        </form>
      ) : (
        <button
          className="hover:bg-slate-700/50 transition-colors duration-150 rounded-full p-2"
          onClick={handleToggle}
        >
          <PlusIcon className="h-6" />
        </button>
      )}
    </div>
  );
}
