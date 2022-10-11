import React, { useCallback } from "react";
import { usePomodoro } from "../hooks/usePomodoro";
import { Pomodoro } from "../types/global";
import IncDecInput from "./IncDecInput";

const heading = ["Pomodoro", "todo list", "spotify", "inspiration"];

export default function Settings({
  toggle,
  handleToggle,
}: {
  toggle: boolean;
  handleToggle: () => void;
}) {
  const { pomodoro, pomodoroDispatch, resetTimer } = usePomodoro();
  const handleReset = useCallback((pomodoro: Pomodoro | undefined) => {
    if (pomodoro?.hasStarted) {
      pomodoroDispatch({ type: "RESET_ROUND" });
      resetTimer(pomodoro);
    }
  }, []);

  return (
    // Backdrop
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 z-50 ${
        toggle ? "scale-100" : "scale-0"
      } flex items-center justify-center bg-black/40 transition-transform duration-150 ease-in-out`}
    >
      {/* MODAL */}
      <div
        className={` w-[360px] ${
          toggle ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
        } rounded transition-all delay-150 duration-150 ease-in-out`}
      >
        {/* MODAL HEADING */}
        <div className="flex justify-between rounded-t bg-amber-500">
          <p className="p-2">Settings</p>
          <button className="p-2" onClick={handleToggle}>
            X
          </button>
        </div>
        {/* MENU */}
        <div className="h-[500px] rounded-b border border-amber-500 bg-gray-900/50 bg-opacity-60 bg-clip-padding p-2 backdrop-blur-sm backdrop-filter">
          {/* MENU HEADING */}
          <h2 className="flex items-center justify-around gap-2 border-b border-gray-400/50 ">
            {heading.map((h) => (
              <button className="text-gray-200/50 transition-colors duration-150 ease-in-out hover:text-white">
                {h}
              </button>
            ))}
          </h2>
          {/* MENU BODY */}
          <div>
            <div className="flex justify-around p-2">
              <div className="flex flex-col justify-center">
                <h3 className="text-center">Pomodoro</h3>
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
              <div className="flex flex-col justify-center">
                <h3 className="text-center">Short</h3>
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
              <div className="flex flex-col justify-center">
                <h3 className="text-center">Long</h3>
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
              <div>
                <button
                  className="mt-6 flex items-center justify-center rounded p-2 hover:bg-black/50"
                  onClick={() => {
                    pomodoroDispatch({ type: "INITIAL_POMODORO" });
                  }}
                >
                  reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
