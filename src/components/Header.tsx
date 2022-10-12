import {
  ChevronDownIcon,
  EyeIcon,
  ClockIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  QueueListIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import { useWidget } from "../hooks/useWidget";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function Header({ handleToggle }: { handleToggle: () => void }) {
  const today = new Date();
  const visibility = useWidget();
  const icons = [
    {
      id: "pomodoro",
      icon: <ClockIcon className="h-6" />,
      color: "border-indigo-500",
      active: visibility.pomodoroToggle.toggle,
      toggler: visibility.pomodoroToggle.handleToggle,
    },
    {
      id: "inspiration",
      icon: <ChatBubbleLeftEllipsisIcon className="h-6" />,
      color: "border-fuchsia-500",
      active: visibility.inspirationToggle.toggle,
      toggler: visibility.inspirationToggle.handleToggle,
    },
    {
      id: "todo",
      icon: <QueueListIcon className="h-6" />,
      color: "border-purple-500",
      active: visibility.todolistToggle.toggle,
      toggler: visibility.todolistToggle.handleToggle,
    },
    {
      id: "spotify",
      icon: <MusicalNoteIcon className="h-6" />,
      color: "border-green-900",
      active: visibility.spotifyToggle.toggle,
      toggler: visibility.spotifyToggle.handleToggle,
    },
  ];
  return (
    <header className="z-50 flex h-full w-full items-start justify-end shadow-lg">
      {/* clock */}
      <span className="mx-auto">
        {months[today.getMonth()]} {today.getDate()} {today.getHours()}:
        {`${today.getMinutes()}`.padStart(2, "0")}
      </span>
      {/* settings */}
      <button
        onClick={handleToggle}
        className="flex items-center text-gray-300 drop-shadow-2xl transition-colors duration-150 ease-in-out hover:text-white"
      >
        <span>settings</span> <ChevronDownIcon className="h-4" />
      </button>
      {/* sidebar menue */}
      <div className="group absolute top-0 left-0 bottom-0">
        <button className="px-2 text-white transition-transform duration-150 ease-in-out group-hover:rotate-90 ">
          <EyeIcon className="h-6" />
        </button>
        <ul
          className={`${"-translate-x-full"} flex flex-col gap-2 rounded border-2 border-teal-500 bg-opacity-60 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter transition-transform duration-150 ease-in-out group-hover:translate-x-0`}
        >
          {icons.map((icon) => (
            <li
              key={icon.id}
              className={`rounded-full border-2 transition-colors duration-300 ease-in-out hover:bg-black/50 ${
                !icon.active ? icon.color : `${icon.color}/50`
              }`}
            >
              <button
                onClick={icon.toggler}
                className={`flex items-center justify-center p-2  `}
              >
                {icon.icon}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
