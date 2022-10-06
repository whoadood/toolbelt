import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function TodoItem({
  todo,
  setTodos,
}: {
  todo: {
    text: string;
    currentRound: number;
    complete: boolean;
    totalRounds: number;
  };
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
}) {
  return (
    <div
      className={`${
        todo.complete ? "opacity-50 hover:opacity-100" : ""
      } border-solid shadow-lg flex items-center justify-between hover:border-white transition-colors font-normal border-2 py-2 px-2 transition-opacity duration-150 rounded border-slate-600`}
      key={todo.text}
    >
      <div>
        <p className={`${todo.complete ? "line-through" : ""}`}>{todo.text}</p>
      </div>
      <div className="flex gap-2">
        <p className="flex items-center text-gray-400 font-bold">
          {todo.currentRound}/{todo.totalRounds}
        </p>
        <label
          htmlFor={todo.text}
          onClick={() => {
            setTodos((prev) => {
              const newTodos = prev.map((td) => {
                if (td.text === todo.text) {
                  if (td.complete) {
                    return { ...td, complete: false, currentRound: 0 };
                  }
                  if (td.currentRound === td.totalRounds - 1) {
                    return {
                      ...td,
                      complete: !td.complete,
                      currentRound: td.totalRounds,
                    };
                  }
                  return { ...td, currentRound: td.currentRound + 1 };
                }
                return td;
              });
              return newTodos;
            });
          }}
          className={`${
            todo.complete ? "text-green-700" : "text-gray-200/20"
          }  flex items-center rounded-full active:text-green-700 cursor-pointer p-1 hover:bg-slate-700/50 transition-colors duration-150 rounded-full transition-colors duration-150`}
        >
          <CheckCircleIcon className="h-8" />
          <input
            name={todo.text}
            autoComplete="off"
            type="checkbox"
            className="appearance-none"
            readOnly
            checked={todo.complete}
          />
        </label>
        <button
          className="hover:bg-slate-700/50 transition-colors duration-150 p-2 rounded-full"
          onClick={() => {
            setTodos((prev) => {
              return prev.filter((td) => td.text !== todo.text);
            });
          }}
        >
          {<TrashIcon className="h-6" />}
        </button>
      </div>
    </div>
  );
}
