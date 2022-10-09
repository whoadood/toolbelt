import { usePomodoro } from "../hooks/usePomodoro";

export default function Pomodoro() {
  const { pomodoro, pomodoroDispatch, time, resetTimer } = usePomodoro();
  return (
    <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
      <h1
        className={`${
          !pomodoro?.isBreak && pomodoro?.hasStarted && !pomodoro.isPaused
            ? "text-white"
            : "text-gray-400/50"
        }
         text-8xl mx-auto`}
      >
        <span>{`${String(time.minutes).padStart(2, "0")}:${String(
          time.seconds
        ).padStart(2, "0")}`}</span>
      </h1>
      <div className="flex justify-around items-center">
        <button
          disabled={pomodoro?.hasStarted && !pomodoro?.isPaused}
          className={`${"hover:text-white"} text-gray-400/50 transition-colors duration-150 ease-in-out`}
          onClick={() => {
            if (!pomodoro?.hasStarted) {
              pomodoroDispatch({ type: "START_ROUND" });
            }
            pomodoroDispatch({ type: "UNPAUSE_TIMER" });
          }}
        >
          start
        </button>
        <button
          className="hover:text-white text-gray-400/50 transition-colors duration-150 ease-in-out"
          onClick={() => {
            pomodoroDispatch({ type: "PAUSE_TIMER" });
          }}
        >
          pause
        </button>
        <button
          className="hover:text-white text-gray-400/50 transition-colors duration-150 ease-in-out"
          onClick={() => {
            pomodoroDispatch({ type: "RESET_ROUND" });
            resetTimer();
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
