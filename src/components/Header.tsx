import {
  ChevronDownIcon,
  EyeIcon,
  ClockIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  QueueListIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useNotes } from "../hooks/useNotes";
import useToggle from "../hooks/useToggle";
import { useWidget } from "../hooks/useWidget";
import uuid from "react-uuid";

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
  const { notesDispatch } = useNotes();
  const { toggle: visibilityMenuActive, handleToggle: visibiltyMenuToggle } =
    useToggle();
  const icons = [
    {
      id: "notes",
      icon: <DocumentTextIcon className="z-10 h-6" />,
      color: "amber-500",
      active: false,
      toggler: () => {
        notesDispatch({ type: "ADD_NOTE", value: { id: uuid(), text: "" } });
      },
    },
    {
      id: "pomodoro",
      icon: <ClockIcon className="z-10 h-6" />,
      color: "indigo-500",
      active: visibility.pomodoroToggle.toggle,
      toggler: visibility.pomodoroToggle.handleToggle,
    },
    {
      id: "inspiration",
      icon: <ChatBubbleLeftEllipsisIcon className="z-10 h-6" />,
      color: "fuchsia-600",
      active:
        window.innerWidth < 810
          ? !visibility.inspirationToggle.toggle
          : visibility.inspirationToggle.toggle,
      toggler: visibility.inspirationToggle.handleToggle,
    },
    {
      id: "todo",
      icon: <QueueListIcon className="z-10 h-6" />,
      color: "purple-500",
      active: visibility.todolistToggle.toggle,
      toggler: visibility.todolistToggle.handleToggle,
    },
    {
      id: "spotify",
      icon: <MusicalNoteIcon className="z-10 h-6" />,
      color: "green-900",
      active:
        window.innerWidth < 810
          ? !visibility.spotifyToggle.toggle
          : visibility.spotifyToggle.toggle,
      toggler: visibility.spotifyToggle.handleToggle,
    },
  ];
  return (
    <header className=" z-50 flex h-full w-full items-start justify-end shadow-lg">
      {/* ********** clock ********** */}
      <span className="mx-auto">
        {months[today.getMonth()]} {today.getDate()} {today.getHours()}:
        {`${today.getMinutes()}`.padStart(2, "0")}
      </span>
      {/* ********** settings ********** */}
      <button
        onClick={handleToggle}
        className="flex items-center text-gray-300 drop-shadow-2xl transition-colors duration-150 ease-in-out hover:text-white"
      >
        <span>settings</span> <ChevronDownIcon className="h-4" />
      </button>
      {/* ********** sidebar menu container ********** */}
      <div className="group absolute top-0 bottom-0 -left-14 sm:left-0">
        <button
          onClick={visibiltyMenuToggle}
          className={`${
            visibilityMenuActive ? "rotate-90" : ""
          }  translate-x-16 px-2 text-white transition-transform duration-150 ease-in-out group-hover:rotate-90 sm:translate-x-0`}
        >
          <EyeIcon className="h-6" />
        </button>
        {/* ********** menu ********** */}
        <ul
          className={`-translate-x-full ${
            visibilityMenuActive ? " translate-x-full sm:translate-x-0" : ""
          } flex flex-col gap-2 rounded border-2 border-teal-500 bg-opacity-60 bg-clip-padding p-2 text-white backdrop-blur-sm backdrop-filter transition-transform duration-150 ease-in-out group-hover:translate-x-0`}
        >
          {icons.map((icon) => (
            <li
              key={icon.id}
              className={`rounded-full transition-colors duration-300 ease-in-out ${`border-${icon.color}/50`}`}
            >
              <button
                onClick={icon.toggler}
                className={`relative flex items-center justify-center p-2  `}
              >
                {icon.icon}
                <div
                  className={`bg-${icon.color} ${
                    icon.active ? "scale-0" : "scale-105"
                  }  absolute h-full w-full rounded-full transition-transform duration-150 ease-in-out`}
                ></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
