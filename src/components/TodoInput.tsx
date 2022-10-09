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
        className="bg-black/50 hover:bg-black/75 focus:bg-black/75 outline-none w-64 rounded font-normal py-1 px-2 focus:outline-white"
        type="text"
        ref={todoRef as MutableRefObject<HTMLInputElement>}
      />
      <div className="flex flex-row bg-black/50 h-10  rounded ml-2">
        <button
          type="button"
          data-action="decrement"
          className="hover:text-white text-gray-400 hover:bg-black/50 h-full w-6 rounded-l z-10 cursor-pointer"
          onClick={subRound}
        >
          <span className="m-auto text-2xl font-bold">−</span>
        </button>
        <input
          type="hidden"
          className="outline-none focus:outline-none text-center p-0 w-full appearance-none font-semibold text-md md:text-base cursor-default flex items-center"
          name="custom-input-number"
          value={rounds}
          readOnly
        />
        <div className="outline-none focus:outline-none text-center px-1/2 w-6 appearance-none font-semibold text-md md:text-base cursor-default flex justify-center items-center">
          {rounds}
        </div>
        <button
          data-action="increment"
          type="button"
          className="hover:text-white text-gray-400  hover:bg-black/50 h-full w-6 rounded-r cursor-pointer"
          onClick={addRound}
        >
          <span className="m-auto text-2xl font-bold">+</span>
        </button>
      </div>
    </>
  );
}
