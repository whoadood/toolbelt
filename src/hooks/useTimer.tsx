import { useState, useEffect, useCallback } from "react";
import { Pomodoro } from "../types/global";

const UseTimer = (
  pomodoro: Pomodoro,
  taskCompletedCallback: () => void,
  roundCompleteCallback: () => void
) => {
  const [seconds, setSeconds] = useState(pomodoro.pom * 60);
  console.log("timer seconds", seconds);

  useEffect(() => {
    let time: number | undefined;
    if (pomodoro.hasStarted) {
      if (!pomodoro.isPaused) {
        if (seconds === 0) {
          taskCompletedCallback();
        } else if (seconds > 0) {
          time = setInterval(() => {
            setSeconds(seconds - 1);
          }, 1000);
        }
      }
    }

    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [pomodoro.hasStarted, pomodoro.isPaused, seconds]);

  useEffect(() => {
    if (pomodoro.roundComplete) {
      if (pomodoro.isBreak) {
        if (pomodoro.breakCount > 3) {
          console.log("break effect long");
          setSeconds(pomodoro.long * 60);
        } else {
          console.log("break effect short");
          setSeconds(pomodoro.short * 60);
        }
      } else {
        setSeconds(pomodoro.pom * 60);
      }
      roundCompleteCallback();
    }
  }, [pomodoro, seconds]);

  return { seconds, setSeconds };
};

export default UseTimer;
