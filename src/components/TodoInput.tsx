import { MutableRefObject } from "react";
import { Todo } from "../types/global";
import IncDecInput from "./IncDecInput";

export default function TodoInput({
  todo,
  todoRef,
  rounds,
  addRound,
  subRound,
}: {
  todo?: Todo;
  todoRef: MutableRefObject<HTMLInputElement>;
  rounds: number;
  addRound: () => void;
  subRound: () => void;
}) {
  return (
    <>
      <input
        autoComplete="off"
        aria-label="input new todo text"
        autoFocus
        name="text"
        className="w-52 rounded bg-black/50 py-1 px-2 font-normal outline-none hover:bg-black/75 focus:bg-black/75 focus:outline-white"
        type="text"
        ref={todoRef as MutableRefObject<HTMLInputElement>}
        onFocus={() => {
          if (todo) {
            todoRef.current.value = todo.text;
          }
        }}
      />
      <IncDecInput rounds={rounds} addRound={addRound} subRound={subRound} />
    </>
  );
}
