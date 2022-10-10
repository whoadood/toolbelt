import { MutableRefObject } from "react";

export default function TodoInput({
  todoRef,
  rounds,
  addRound,
  subRound,
}: {
  todoRef: MutableRefObject<HTMLInputElement>;
  rounds: number;
  addRound: () => void;
  subRound: () => void;
}) {
  return (
    <>
      <input
        autoComplete="off"
        autoFocus
        name="text"
        className="w-64 rounded bg-black/50 py-1 px-2 font-normal outline-none hover:bg-black/75 focus:bg-black/75 focus:outline-white"
        type="text"
        ref={todoRef as MutableRefObject<HTMLInputElement>}
      />
      <div className="ml-2 flex h-10 flex-row  rounded bg-black/50">
        <button
          type="button"
          data-action="decrement"
          className="z-10 h-full w-6 cursor-pointer rounded-l text-gray-400 hover:bg-black/50 hover:text-white"
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
          className="h-full w-6  cursor-pointer rounded-r text-gray-400 hover:bg-black/50 hover:text-white"
          onClick={addRound}
        >
          <span className="m-auto text-2xl font-bold">+</span>
        </button>
      </div>
    </>
  );
}
