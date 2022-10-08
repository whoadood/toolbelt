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
  isBreak: false,
  breakCount: 0,
};

const PomodoroContext = createContext<
  | {
      pomodoro: typeof initialPomodoro;
      pomodoroDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
      pomMinutes: number;
      formatPomSeconds: string;
      breakMinutes: number;
      formatBreakSeconds: string;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE =
  | {
      type:
        | "START_ROUND"
        | "RESET_ROUND"
        | "STOP_TIMER"
        | "TRIGGER_BREAK"
        | "END_BREAK";
      value?: undefined;
    }
  | {
      type: "COMPLETE_ROUND";
      value: string;
    };

const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
  const [countdown, setCountdown] = useState(0);

  const startTimer = useCallback(() => {
    if (!pomodoro?.hasStarted) {
      setCountdown(countdown + 1);
    }
    setCountdown(countdown + 1);
  }, []);

  const resetTimer = useCallback(() => {
    (resetPomSeconds as () => void)();
    (resetBreakSeconds as () => void)();
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
        return {
          ...state,
          isRunning: false,
          isBreak: false,
          breakCount: 0,
          hasStarted: false,
        };
      case "TRIGGER_BREAK":
        resetTimer();
        if (state.breakCount > 3) {
          return { ...state, isBreak: true, breakCount: 0 };
        }
        return { ...state, isBreak: true, breakCount: state.breakCount + 1 };
      case "END_BREAK":
        resetTimer();
        return {
          ...state,
          isBreak: false,
          isRunning: true,
        };
      default:
        return initialPomodoro;
    }
  };

  const [pomodoro, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    initialPomodoro
  );
  console.log("pomodoro context:", pomodoro);

  const { seconds: pomSeconds, resetSeconds: resetPomSeconds } = useTimer(
    (pomodoro as typeof initialPomodoro).isRunning,
    0.25 * 60,
    () => {
      pomodoroDispatch({ type: "STOP_TIMER" });
      pomodoroDispatch({ type: "TRIGGER_BREAK" });
    }
  );
  const { seconds: breakSeconds, resetSeconds: resetBreakSeconds } = useTimer(
    (pomodoro as typeof initialPomodoro).isBreak,
    (pomodoro as typeof initialPomodoro).breakCount > 3
      ? (pomodoro as typeof initialPomodoro).long * 60
      : 0.5 * 60,
    () => {
      pomodoroDispatch({
        type: "END_BREAK",
      });
    }
  );

  useEffect(() => {
    if (
      (pomodoro as typeof initialPomodoro)?.isRunning ||
      (pomodoro as typeof initialPomodoro).isBreak
    ) {
      if (countdown >= 59) {
        setCountdown(0);
      } else {
        setCountdown(countdown + 1);
      }
    }
  }, [pomSeconds, breakSeconds]);

  const getMinutesAndSeconds = useCallback(
    (seconds: number, countdown: number, hasStarted: boolean) => {
      console.log("min and sec", seconds);
      const minutes = hasStarted
        ? Math.floor((seconds - 1) / 60)
        : Math.floor(seconds / 60);
      const formatSeconds = `00${
        60 - countdown === 60 ? "" : 60 - countdown
      }`.slice(-2);
      return { minutes, formatSeconds };
    },
    [pomodoro?.isBreak]
  );

  const { minutes: pomMinutes, formatSeconds: formatPomSeconds } =
    getMinutesAndSeconds(
      pomSeconds as number,
      countdown,
      (pomodoro as typeof initialPomodoro).isRunning
    );

  const { minutes: breakMinutes, formatSeconds: formatBreakSeconds } =
    getMinutesAndSeconds(
      breakSeconds as number,
      countdown,
      (pomodoro as typeof initialPomodoro).isBreak
    );

  const data = {
    pomodoro: pomodoro as typeof initialPomodoro,
    pomodoroDispatch,
    pomMinutes,
    formatPomSeconds,
    breakMinutes,
    formatBreakSeconds,
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
