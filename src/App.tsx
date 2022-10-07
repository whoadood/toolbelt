import { MutableRefObject, useRef } from "react";
import Spotify from "./components/Spotify";
import Draggable from "./components/Draggable";
import TodoItem from "./components/TodoItem";
import TodoTitle from "./components/TodoTitle";
import SpotifyTitle from "./components/SpotifyTitle";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos } = useTodos();
  const todoRef = useRef<HTMLInputElement>();

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 text-gray-100 font-bold justify-end px-2 relative">
      <header className="shadow-lg">
        <button className="drop-shadow-2xl hover:text-white ease-in-out transition-colors duration-150 text-gray-300 flex items-center">
          <span>settings</span> <ChevronDownIcon className="h-4" />
        </button>
      </header>
      <div className="absolute top-6 right-0 left-0 bottom-0 bg-slate-700 text-white font-bold">
        <Draggable title={<div>pomodoro</div>}>
          <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
            pomo
          </div>
        </Draggable>
        <Draggable
          startY={210}
          title={
            <TodoTitle
              todoRef={todoRef as MutableRefObject<HTMLInputElement>}
            />
          }
        >
          <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
            {todos.map((todo) => (
              <TodoItem key={todo.text} todo={todo} />
            ))}
          </div>
        </Draggable>
        <Draggable startX={760} title={<SpotifyTitle />}>
          <Spotify />
        </Draggable>
      </div>
    </div>
  );
}

export default App;
