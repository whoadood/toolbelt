import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";

export default function TodoTitle({
  inputTodo,
  setTodos,
  todoRef,
  setInputTodo,
}: {
  inputTodo: boolean;
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
  todoRef: React.MutableRefObject<string>;
  setInputTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [rounds, setRounds] = useState(1);
  const reset = useCallback(() => {
    setInputTodo(false);
    todoRef.current = "";
    setRounds(1);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => {
      return [
        ...prev,
        {
          text: todoRef.current,
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
      {inputTodo ? (
        <form
          className="flex flex-no-wrap"
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSubmit(e);
            }
            if (e.code === "Escape") {
              console.log("key code", e.code);
              reset();
              setInputTodo(false);
            }
          }}
        >
          <input
            autoComplete="off"
            autoFocus
            name="text"
            className="bg-slate-800 outline-none w-64 rounded font-normal py-1 px-2 focus:outline-white"
            type="text"
            onChange={(e) => (todoRef.current = e.target.value)}
          />
          <div className="flex hover:outline-white flex-row h-10 w-full rounded mr-10 ml-1">
            <button
              type="button"
              data-action="decrement"
              className=" bg-slate-800 hover:text-white text-gray-600 hover:bg-slate-900 h-full w-10 rounded-l z-10 cursor-pointer"
              onClick={() => setRounds(rounds - 1 > 0 ? rounds - 1 : 1)}
            >
              <span className="m-auto text-2xl font-bold">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center p-0 w-full bg-slate-800 appearance-none font-semibold text-md md:text-base cursor-default flex items-center outline-none"
              name="custom-input-number"
              value={rounds}
              readOnly
            />
            <button
              data-action="increment"
              type="button"
              className="bg-slate-800 hover:text-white text-gray-600 hover:bg-slate-900 h-full w-10 rounded-r cursor-pointer"
              onClick={() => setRounds(rounds + 1)}
            >
              <span className="m-auto text-2xl font-bold">+</span>
            </button>
          </div>
        </form>
      ) : (
        <button
          className="hover:bg-slate-700/50 transition-colors duration-150 rounded-full p-2"
          onClick={(e) => setInputTodo(true)}
        >
          <PlusIcon className="h-6" />
        </button>
      )}
    </div>
  );
}
