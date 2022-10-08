import React, { useEffect, useRef, useState, useCallback } from "react";
import useTimer from "../hooks/useTimer";

export default function Pomodoro() {
  const [pomo, setPomo] = useState({
    pom: 25,
    short: 5,
    long: 15,
    isRunning: false,
    hasStarted: false,
    pauseTime: -1,
  });

  const [seconds, setSeconds] = useTimer(pomo.isRunning, pomo.pom * 60, () =>
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

  useEffect(() => {
    if (pomo.isRunning) {
      if (countdown >= 59) {
        setCountdown(0);
      } else {
        setCountdown(countdown + 1);
      }
    }
  }, [seconds]);

  console.log("seconds ", (seconds as number) / 60);
  console.log("coutndown ", countdown);

  return (
    <div className="bg-slate-800 flex flex-col gap-2 rounded-b min-w-[400px] p-2 min-h-[150px]">
      <h1>
        <p>Timer</p>
        <span>
          {minutes}:{formatSeconds}
        </span>
      </h1>
      <div>
        <button
          onClick={() => {
            if (!pomo.hasStarted) {
              setCountdown(countdown + 1);
              setPomo({ ...pomo, hasStarted: true });
            }
            setPomo({ ...pomo, isRunning: true });
            console.log("pomo start", pomo);
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            setPomo({ ...pomo, isRunning: false });
            console.log("pomo stop", pomo);
          }}
        >
          stop
        </button>
      </div>
    </div>
  );
}
