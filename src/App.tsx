import { LegacyRef, MutableRefObject, useRef, useState } from "react";
import Spotify from "./components/Spotify";
import Draggable from "./components/Draggable";
import TodoItem from "./components/TodoItem";
import TodoTitle from "./components/TodoTitle";
import SpotifyTitle from "./components/SpotifyTitle";

function App() {
  const [todos, setTodos] = useState<
    {
      text: string;
      currentRound: number;
      complete: boolean;
      totalRounds: number;
    }[]
  >([]);

  const [inputTodo, setInputTodo] = useState(false);

  const todoRef = useRef<MutableRefObject<HTMLInputElement>>();

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 text-gray-100 font-bold justify-end px-2 relative">
      <header className="shadow-lg">
        <span className="drop-shadow-2xl">hello</span>
      </header>
      <div className="absolute top-6 right-0 left-0 bottom-0 bg-slate-700 text-white font-bold">
        <Draggable
          title={
            <TodoTitle
              inputTodo={inputTodo}
              todoRef={todoRef}
              setInputTodo={setInputTodo}
              setTodos={setTodos}
            />
          }
        >
          <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
            {todos.map((todo) => (
              <TodoItem key={todo.text} todo={todo} setTodos={setTodos} />
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
