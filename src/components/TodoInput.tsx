import { MutableRefObject } from "react";
import IncDecInput from "./IncDecInput";

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
      <IncDecInput rounds={rounds} addRound={addRound} subRound={subRound} />
    </>
  );
}
