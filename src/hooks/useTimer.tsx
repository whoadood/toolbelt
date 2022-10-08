import { useState, useEffect } from "react";

const UseTimer = (
  timerStarted: boolean,
  initialSeconds: number,
  taskCompletedCallback: () => void
) => {
  const [seconds, setSeconds] = useState(initialSeconds);

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

  return [seconds, setSeconds];
};

export default UseTimer;
