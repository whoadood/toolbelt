import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePomodoro } from "../hooks/usePomodoro";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/global";
import { ClockIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import useToggle from "../hooks/useToggle";
import TodoInput from "./TodoInput";
import { useRef } from "react";
import useTodoRounds from "../hooks/useTodoRounds";
import ControlledTodoInput from "./ControlledTodoInput";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { todosDispatch } = useTodos();
  const { pomodoro } = usePomodoro();
  const { toggle, handleToggle } = useToggle();
  const { rounds, addRound, subRound } = useTodoRounds(todo.totalRounds);

  return (
    <div
      className={`${
        todo.complete ? "opacity-50 hover:opacity-100" : ""
      } flex items-center justify-between rounded border-2 border-solid border-purple-500/25 py-2 px-2 font-normal shadow-lg transition-all duration-150 hover:border-purple-500`}
    >
      {toggle ? (
        <>
          <ControlledTodoInput
            todo={todo}
            rounds={rounds}
            addRound={addRound}
            subRound={subRound}
            handleToggle={handleToggle}
          />
          <button
            type="button"
            className="ml-1 rounded-full p-2 text-gray-200/20 transition-colors duration-150 hover:bg-black/50  hover:text-white"
            onClick={() => {
              todosDispatch({ type: "DELETE_TODO", value: todo.id });
            }}
          >
            {<TrashIcon className="h-6" />}
          </button>
        </>
      ) : (
        <>
          {/* ************ todo text ************ */}
          <div>
            <div className="flex gap-2">
              {pomodoro?.activeTodo === todo.id && (
                <ClockIcon className="h-6 text-indigo-500" />
              )}
              <p className={`${todo.complete ? "line-through" : ""}`}>
                {todo.text}
              </p>
            </div>
          </div>
          {/* ************ todo info ************ */}
          <div className="flex gap-2">
            <p className="flex items-center font-bold text-gray-400">
              {todo.currentRound}/{todo.totalRounds}
            </p>
            <button
              className="rounded-full p-2 text-gray-200/20 transition-colors duration-150 hover:bg-black/50  hover:text-white"
              onClick={handleToggle}
            >
              {<EllipsisVerticalIcon className="h-6" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
