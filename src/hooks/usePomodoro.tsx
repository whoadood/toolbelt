import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useTimer from "./useTimer";

const initialPomodoro = {
  pom: 25,
  short: 5,
  long: 15,
  isRunning: false,
  hasStarted: false,
};

const PomodoroContext = createContext<
  | {
      pomodoro: typeof initialPomodoro;
      pomodoroDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
      minutes: number;
      formatSeconds: string;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE =
  | {
      type: "START_ROUND" | "RESET_ROUND" | "STOP_TIMER";
      value?: undefined;
    }
  | {
      type: "COMPLETE_ROUND";
      value: string;
    };

const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
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

  const startTimer = useCallback(() => {
    if (!pomodoro?.hasStarted) {
      setCountdown(countdown + 1);
    }
    setCountdown(countdown + 1);
  }, []);

  const resetTimer = useCallback(() => {
    (resetSeconds as () => void)();
    setCountdown(0);
  }, []);

  const pomodoroReducer = (
    state = initialPomodoro,
    action: REDUCER_ACTION_TYPE
  ) => {
    switch (action.type) {
      case "START_ROUND":
        startTimer();
        return { ...state, hasStarted: true, isRunning: true };
      case "COMPLETE_ROUND":
        console.log(action.value);
        break;
      case "STOP_TIMER":
        return { ...state, isRunning: false };
      case "RESET_ROUND":
        resetTimer();
        return { ...state, isRunning: false, hasStarted: false };
      default:
        return initialPomodoro;
    }
  };
  const [pomodoro, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    initialPomodoro
  );

  const [seconds, resetSeconds] = useTimer(
    (pomodoro as typeof initialPomodoro).isRunning,
    (pomodoro as typeof initialPomodoro).pom * 60,
    () => pomodoroDispatch({ type: "STOP_TIMER" })
  );

  const { minutes, formatSeconds } = getMinutesAndSeconds(
    seconds as number,
    countdown,
    (pomodoro as typeof initialPomodoro).isRunning
  );

  useEffect(() => {
    if (pomodoro?.isRunning) {
      if (countdown >= 59) {
        setCountdown(0);
      } else {
        setCountdown(countdown + 1);
      }
    }
  }, [seconds]);

  const data = {
    pomodoro: pomodoro as typeof initialPomodoro,
    pomodoroDispatch,
    minutes,
    formatSeconds,
  };

  return (
    <PomodoroContext.Provider value={data}>{children}</PomodoroContext.Provider>
  );
};

const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro can only be used inside pomodoroProvider");
  }
  return context;
};

export { PomodoroProvider, usePomodoro };
