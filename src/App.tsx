import { MutableRefObject, useRef } from "react";
import Spotify from "./components/Spotify";
import Draggable from "./components/Draggable";
import TodoItem from "./components/TodoItem";
import TodoTitle from "./components/TodoTitle";
import SpotifyTitle from "./components/SpotifyTitle";
import { useTodos } from "./hooks/useTodos";
import Pomodoro from "./components/Pomodoro";
import { usePomodoro } from "./hooks/usePomodoro";
import Inspiration from "./components/Inspiration";
import Header from "./components/Header";

function App() {
  const { todos } = useTodos();
  const { pomodoro } = usePomodoro();

  const todoRef = useRef<HTMLInputElement>();

  return (
    <div className="relative flex min-h-screen justify-end bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 px-2 font-bold text-gray-100">
      <Header />
      <div className="absolute top-6 right-0 left-0 bottom-0 bg-[url('/computerguy.gif')] bg-cover bg-center font-bold text-white ">
        <Draggable
          title={
            <div className="rounded-t bg-fuchsia-600 p-2">Inspiration</div>
          }
          border={"border-fuchsia-500"}
          startX={40}
          startY={210}
        >
          <Inspiration />
        </Draggable>
        <Draggable
          title={
            <div className="rounded-tl rounded-tr bg-indigo-500 p-2">
              {pomodoro?.isBreak
                ? pomodoro.breakCount > 3
                  ? `Long Break`
                  : `Short Break ${pomodoro.breakCount}`
                : "Pomodoro"}
            </div>
          }
          border={"border-indigo-500"}
        >
          <Pomodoro />
        </Draggable>
        <Draggable
          startY={210}
          title={
            <TodoTitle
              todoRef={todoRef as MutableRefObject<HTMLInputElement>}
            />
          }
          border={"border-purple-500"}
        >
          <div className="flex min-h-[150px] min-w-[400px] flex-col gap-2 rounded-b p-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </Draggable>
        <Draggable
          startX={760}
          border={"border-green-900"}
          title={<SpotifyTitle />}
        >
          <Spotify />
        </Draggable>
      </div>
    </div>
  );
}

export default App;
