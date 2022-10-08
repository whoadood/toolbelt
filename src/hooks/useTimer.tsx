import { useState, useEffect, useCallback } from "react";

const UseTimer = (
  timerStarted: boolean,
  initialSeconds: number,
  taskCompletedCallback: () => void
) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  const resetSeconds = useCallback(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds, timerStarted, taskCompletedCallback]);

  useEffect(() => {
    let time: number | undefined;

    if (timerStarted) {
      if (seconds === 0) {
        taskCompletedCallback();
      } else if (seconds > 0) {
        time = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);
      }
    }

    return () => {
      if (time) {
        clearInterval(time);
      }
    };
  }, [timerStarted, seconds, taskCompletedCallback]);

  return { seconds, resetSeconds };
};

export default UseTimer;
