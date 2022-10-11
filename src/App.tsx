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
import Settings from "./components/Settings";
import useToggle from "./hooks/useToggle";
import { useSettings } from "./hooks/useSettings";

function App() {
  const { todos } = useTodos();
  const { pomodoro } = usePomodoro();
  const { toggle, handleToggle } = useToggle();
  const todoRef = useRef<HTMLInputElement>();
  const { activeImage } = useSettings();

  return (
    <div className="relative flex min-h-screen justify-end bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 px-2 font-bold text-gray-100">
      <Header handleToggle={handleToggle} />
      <Settings toggle={toggle} handleToggle={handleToggle} />
      {/* ************ dropzone ************ */}
      <div
        style={{ backgroundImage: `url('${activeImage}')` }}
        className={`absolute top-6 right-0 left-0 bottom-0 bg-cover bg-center font-bold text-white `}
      >
        {/* ************ inspirational quotes ************ */}
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
        {/* ************ pomodoro ************ */}
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
        {/* ************ todo list ************ */}
        <Draggable
          startY={210}
          title={
            <TodoTitle
              todoRef={todoRef as MutableRefObject<HTMLInputElement>}
            />
          }
          border={"border-purple-500"}
        >
          <div className="flex min-h-[150px] min-w-[360px] flex-col gap-2 rounded-b p-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </Draggable>
        {/* ************ spotify ************ */}
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
