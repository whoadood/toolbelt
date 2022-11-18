import React from "react";

export default function IncDecInput({
  rounds,
  addRound,
  subRound,
}: {
  rounds: number;
  addRound: () => void;
  subRound: () => void;
}) {
  return (
    <div className="ml-1 flex h-10 flex-row  rounded bg-black/50">
      <button
        type="button"
        aria-label="decrement round"
        data-action="decrement"
        className="z-10 h-full w-6 cursor-pointer rounded-l text-gray-400 hover:border-2 hover:border-white hover:bg-black/50 hover:text-white focus:border-2 focus:border-white"
        onClick={subRound}
      >
        <span className="m-auto text-2xl font-bold">−</span>
      </button>
      <input
        type="hidden"
        className="text-md flex w-full cursor-default appearance-none items-center p-0 text-center font-semibold outline-none focus:outline-none md:text-base"
        name="custom-input-number"
        value={rounds}
        readOnly
      />
      <div className="px-1/2 text-md flex w-6 cursor-default appearance-none items-center justify-center text-center font-semibold outline-none focus:outline-none md:text-base">
        {rounds}
      </div>
      <button
        data-action="increment"
        type="button"
        aria-label="increment round"
        className="h-full w-6 cursor-pointer rounded-r text-gray-400 hover:border-2 hover:border-white hover:bg-black/50 hover:text-white focus:border-2 focus:border-white"
        onClick={addRound}
      >
        <span className="m-auto text-2xl font-bold">+</span>
      </button>
    </div>
  );
}
