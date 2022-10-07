import { PlusIcon } from "@heroicons/react/24/outline";
import React, { MutableRefObject, useCallback, useState } from "react";
import TodoInput from "./TodoInput";

export default function TodoTitle({
  toggle,
  setTodos,
  todoRef,
  handleToggle,
}: {
  toggle: boolean;
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        currentRound: number;
        complete: boolean;
        totalRounds: number;
      }[]
    >
  >;
  todoRef: MutableRefObject<HTMLInputElement>;
  handleToggle: () => void;
}) {
  const [rounds, setRounds] = useState(1);
  const reset = () => {
    handleToggle();
    setRounds(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => {
      return [
        ...prev,
        {
          text: todoRef?.current.value,
          currentRound: 0,
          complete: false,
          totalRounds: rounds,
        },
      ];
    });
    reset();
  };

  return (
    <div>
      {toggle ? (
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
          <TodoInput todoRef={todoRef} setRounds={setRounds} rounds={rounds} />
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
