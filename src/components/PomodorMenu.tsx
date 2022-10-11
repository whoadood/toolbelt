import React, { useCallback } from "react";
import { usePomodoro } from "../hooks/usePomodoro";
import { Pomodoro } from "../types/global";
import IncDecInput from "./IncDecInput";

export default function PomodorMenu() {
  const { pomodoro, pomodoroDispatch, resetTimer } = usePomodoro();
  const handleReset = useCallback((pomodoro: Pomodoro | undefined) => {
    if (pomodoro?.hasStarted) {
      pomodoroDispatch({ type: "RESET_ROUND" });
      resetTimer(pomodoro);
    }
  }, []);
  return (
    <div className="flex justify-around p-2">
      {/* ************ pomodoro ************ */}
      <div className="flex flex-col justify-center">
        <h3 className="text-center text-sm">Pomodoro</h3>
        <IncDecInput
          rounds={(pomodoro as Pomodoro).pom}
          addRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "INCREMENT_POMODORO" });
          }}
          subRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "DECREMENT_POMODORO" });
          }}
        />
      </div>
      {/* ************ short break ************ */}
      <div className="flex flex-col justify-center">
        <h3 className="text-center text-sm">Short</h3>
        <IncDecInput
          rounds={(pomodoro as Pomodoro).short}
          addRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "INCREMENT_SHORT" });
          }}
          subRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "DECREMENT_SHORT" });
          }}
        />
      </div>
      {/* ************ long break ************ */}
      <div className="flex flex-col justify-center">
        <h3 className="text-center text-sm">Long</h3>
        <IncDecInput
          rounds={(pomodoro as Pomodoro).long}
          addRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "INCREMENT_LONG" });
          }}
          subRound={() => {
            handleReset(pomodoro);
            pomodoroDispatch({ type: "DECREMENT_LONG" });
          }}
        />
      </div>
      {/* ************ reset ************ */}
      <div>
        <button
          className="mt-6 flex items-center justify-center rounded p-2 text-sm transition-colors duration-150 ease-in-out hover:bg-black/50"
          onClick={() => {
            pomodoroDispatch({ type: "INITIAL_POMODORO" });
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
