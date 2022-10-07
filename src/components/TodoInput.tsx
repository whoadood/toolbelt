import React, { MutableRefObject } from "react";

export default function TodoInput({
  todoRef,
  setRounds,
  rounds,
}: {
  todoRef: MutableRefObject<HTMLInputElement>;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
  rounds: number;
}) {
  return (
    <>
      <input
        autoComplete="off"
        autoFocus
        name="text"
        className="bg-slate-800 outline-none w-64 rounded font-normal py-1 px-2 focus:outline-white"
        type="text"
        ref={todoRef as MutableRefObject<HTMLInputElement>}
      />
      <div className="flex flex-row h-10 w-full rounded ml-2">
        <button
          type="button"
          data-action="decrement"
          className=" bg-slate-800 hover:text-white text-gray-600 hover:bg-slate-900 h-full w-6 rounded-l z-10 cursor-pointer"
          onClick={() => setRounds(rounds - 1 > 0 ? rounds - 1 : 1)}
        >
          <span className="m-auto text-2xl font-bold">−</span>
        </button>
        <input
          type="hidden"
          className="outline-none focus:outline-none text-center p-0 w-full bg-slate-800 appearance-none font-semibold text-md md:text-base cursor-default flex items-center"
          name="custom-input-number"
          value={rounds}
          readOnly
        />
        <div className="outline-none focus:outline-none text-center px-1/2 w-6 bg-slate-800 appearance-none font-semibold text-md md:text-base cursor-default flex justify-center items-center">
          {rounds}
        </div>
        <button
          data-action="increment"
          type="button"
          className="bg-slate-800 hover:text-white text-gray-600  hover:bg-slate-900 h-full w-6 rounded-r cursor-pointer"
          onClick={() => setRounds(rounds + 1)}
        >
          <span className="m-auto text-2xl font-bold">+</span>
        </button>
      </div>
    </>
  );
}
