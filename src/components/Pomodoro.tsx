import { usePomodoro } from "../hooks/usePomodoro";

export default function Pomodoro() {
  const { pomodoro, pomodoroDispatch, time, resetTimer } = usePomodoro();
  return (
    <div className="flex min-h-[150px] min-w-[360px] flex-col gap-2 rounded-b p-2">
      <h2
        className={`${
          !pomodoro?.isBreak && pomodoro?.hasStarted && !pomodoro.isPaused
            ? "text-white"
            : "text-gray-400/50"
        }
         mx-auto text-8xl`}
      >
        <span>{`${String(time.minutes).padStart(2, "0")}:${String(
          time.seconds
        ).padStart(2, "0")}`}</span>
      </h2>
      {/* ************ footer ************ */}
      <div className="flex items-center justify-around">
        <button
          disabled={pomodoro?.hasStarted && !pomodoro?.isPaused}
          className={`text-gray-400/50 transition-colors duration-150 ease-in-out hover:text-white disabled:text-gray-400/50`}
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
          className="text-gray-400/50 transition-colors duration-150 ease-in-out hover:text-white"
          onClick={() => {
            pomodoroDispatch({ type: "PAUSE_TIMER" });
          }}
        >
          pause
        </button>
        <button
          className="text-gray-400/50 transition-colors duration-150 ease-in-out hover:text-white"
          onClick={() => {
            pomodoroDispatch({ type: "RESET_ROUND" });
            if (pomodoro) {
              resetTimer(pomodoro);
            }
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
