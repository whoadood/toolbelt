import { useState, useEffect, useCallback } from "react";
import { Pomodoro } from "../types/global";

const UseTimer = (
  pomodoro: Pomodoro,
  taskCompletedCallback: () => void,
  roundCompleteCallback: () => void
) => {
  const [seconds, setSeconds] = useState(0);

  const resetTimer = useCallback(
    (pomodoro: Pomodoro) => {
      setSeconds(pomodoro.pom * 60);
    },
    [pomodoro.pom]
  );

  // if conditions are met countdown from current state variable
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
  }, [
    pomodoro.hasStarted,
    pomodoro.isPaused,
    pomodoro.short,
    pomodoro.long,
    pomodoro.pom,
    seconds,
  ]);

  // if countdown timer is not running update seconds state, when pomodoro time variables are changed
  useEffect(() => {
    if (!pomodoro.hasStarted) {
      setSeconds(pomodoro.pom * 60);
    }
  }, [pomodoro.pom, pomodoro.short, pomodoro.long, pomodoro.hasStarted]);

  // if conditions are met update seconds state variable to correct break time
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
  }, [
    pomodoro.pom,
    pomodoro.short,
    pomodoro.long,
    pomodoro.isBreak,
    pomodoro.roundComplete,
    seconds,
  ]);

  return { seconds, setSeconds, resetTimer };
};

export default UseTimer;
