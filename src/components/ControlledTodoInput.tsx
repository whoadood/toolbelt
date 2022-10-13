import React, { useCallback, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/global";
import IncDecInput from "./IncDecInput";

export default function ControlledTodoInput({
  todo,
  rounds,
  addRound,
  subRound,
  handleToggle,
}: {
  todo: Todo;
  rounds: number;
  addRound: () => void;
  subRound: () => void;
  handleToggle: () => void;
}) {
  const [input, setInput] = useState(todo.text);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }, []);
  const handleSubmit = (
    e:
      | React.KeyboardEvent<HTMLFormElement>
      | React.FocusEvent<HTMLFormElement, Element>
  ) => {
    e.preventDefault();
    todosDispatch({
      type: "EDIT_TODO",
      value: { ...todo, text: input, totalRounds: rounds },
    });
    handleToggle();
    setInput("");
  };
  const { todosDispatch } = useTodos();

  return (
    <form
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          handleSubmit(e);
        }
        if (e.code === "Escape") {
          handleToggle();
        }
      }}
      // onBlur={(e) => handleSubmit(e)}
      className="flex"
      onSubmit={handleSubmit}
    >
      <input
        autoComplete="off"
        autoFocus
        value={input}
        name="text"
        className="w-52 rounded bg-black/50 py-1 px-2 font-normal outline-none hover:bg-black/75 focus:bg-black/75 focus:outline-white"
        type="text"
        onChange={handleChange}
      />
      <IncDecInput rounds={rounds} addRound={addRound} subRound={subRound} />
    </form>
  );
}
