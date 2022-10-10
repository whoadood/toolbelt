import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/global";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { todosDispatch } = useTodos();
  return (
    <div
      className={`${
        todo.complete ? "opacity-50 hover:opacity-100" : ""
      } flex items-center justify-between rounded border-2 border-solid border-purple-500/25 py-2 px-2 font-normal shadow-lg transition-all duration-150 hover:border-purple-500`}
      key={todo.text}
    >
      <div>
        <p className={`${todo.complete ? "line-through" : ""}`}>{todo.text}</p>
      </div>
      <div className="flex gap-2">
        <p className="flex items-center font-bold text-gray-400">
          {todo.currentRound}/{todo.totalRounds}
        </p>
        <label
          htmlFor={todo.text}
          onClick={() => {
            todosDispatch({ type: "COMPLETE_TODO", value: todo.text });
          }}
          className={`${
            todo.complete ? "text-green-700" : "text-gray-200/20"
          }  flex cursor-pointer items-center rounded-full p-1 transition-colors duration-150 hover:bg-black/50 hover:text-white active:text-green-700`}
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
          className="rounded-full p-2 text-gray-200/20 transition-colors duration-150 hover:bg-black/50  hover:text-white"
          onClick={() => {
            todosDispatch({ type: "DELETE_TODO", value: todo.text });
          }}
        >
          {<TrashIcon className="h-6" />}
        </button>
      </div>
    </div>
  );
}
