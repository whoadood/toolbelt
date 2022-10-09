import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/global";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { todosDispatch } = useTodos();
  return (
    <div
      className={`${
        todo.complete ? "opacity-50 hover:opacity-100" : ""
      } border-solid shadow-lg flex items-center justify-between hover:border-purple-500 font-normal border-2 py-2 px-2 transition-all duration-150 rounded border-purple-500/25`}
      key={todo.text}
    >
      <div>
        <p className={`${todo.complete ? "line-through" : ""}`}>{todo.text}</p>
      </div>
      <div className="flex gap-2">
        <p className="flex items-center text-gray-400 font-bold">
          {todo.currentRound}/{todo.totalRounds}
        </p>
        <label
          htmlFor={todo.text}
          onClick={() => {
            todosDispatch({ type: "COMPLETE_TODO", value: todo.text });
          }}
          className={`${
            todo.complete ? "text-green-700" : "text-gray-200/20"
          }  flex items-center active:text-green-700 cursor-pointer p-1 hover:bg-slate-700/50 rounded-full transition-colors duration-150`}
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
          className="hover:bg-slate-700/50 transition-colors duration-150 p-2 rounded-full"
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
