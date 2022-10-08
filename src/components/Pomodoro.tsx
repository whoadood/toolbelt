import React, { useEffect, useRef, useState, useCallback } from "react";
import useTimer from "../hooks/useTimer";

export default function Pomodoro() {
  const [pomo, setPomo] = useState({
    pom: 25,
    short: 5,
    long: 15,
    isRunning: false,
    hasStarted: false,
  });

  const [seconds, resetSeconds] = useTimer(pomo.isRunning, pomo.pom * 60, () =>
    setPomo({ ...pomo, isRunning: false })
  );

  const [countdown, setCountdown] = useState(0);

  const getMinutesAndSeconds = useCallback(
    (seconds: number, countdown: number, hasStarted: boolean) => {
      const minutes = hasStarted
        ? Math.floor((seconds - 1) / 60)
        : Math.floor(seconds / 60);
      const formatSeconds = `00${
        60 - countdown === 60 ? "" : 60 - countdown
      }`.slice(-2);
      return { minutes, formatSeconds };
    },
    []
  );

  const { minutes, formatSeconds } = getMinutesAndSeconds(
    seconds as number,
    countdown,
    pomo.isRunning
  );

  const startTimer = useCallback(() => {
    if (!pomo.hasStarted) {
      setCountdown(countdown + 1);
      setPomo({ ...pomo, hasStarted: true });
    }
    setCountdown(countdown + 1);
    setPomo({ ...pomo, isRunning: true });
  }, []);

  const stopTimer = useCallback(() => {
    setPomo({ ...pomo, isRunning: false, hasStarted: false });
    (resetSeconds as () => void)();
    setCountdown(0);
  }, []);

  useEffect(() => {
    console.log("use effect ran");
    if (pomo.isRunning) {
      if (countdown >= 59) {
        setCountdown(0);
      } else {
        setCountdown(countdown + 1);
      }
    }
  }, [seconds]);

  return (
    <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
      <h1
        className={`${
          pomo.isRunning ? "text-white" : "text-gray-400/50"
        } text-8xl mx-auto`}
      >
        <span>
          {minutes}:{formatSeconds}
        </span>
      </h1>
      <div className="flex justify-around items-center">
        <button
          disabled={pomo.isRunning}
          className={`${
            !pomo.isRunning ? "hover:text-white" : ""
          } text-gray-400/50 transition-colors duration-150 ease-in-out`}
          onClick={startTimer}
        >
          start
        </button>
        <button
          className="hover:text-white text-gray-400/50 transition-colors duration-150 ease-in-out"
          onClick={stopTimer}
        >
          reset
        </button>
      </div>
    </div>
  );
}
