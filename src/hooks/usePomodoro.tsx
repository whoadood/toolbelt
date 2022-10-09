import { createContext, useContext, useReducer } from "react";
import { Pomodoro } from "../types/global";
import useTimer from "./useTimer";

const initialPomodoro: Pomodoro = {
  pom: 25,
  short: 5,
  long: 15,
  hasStarted: false,
  isBreak: false,
  isPaused: false,
  roundComplete: false,
  breakCount: 0,
};

const PomodoroContext = createContext<
  | {
      pomodoro: Pomodoro | undefined;
      pomodoroDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
      time: {
        minutes: number;
        seconds: number;
      };
      resetTimer: () => void;
    }
  | undefined
>(undefined);

type REDUCER_ACTION_TYPE = {
  type:
    | "START_ROUND"
    | "RESET_ROUND"
    | "START_BREAK"
    | "END_BREAK"
    | "PAUSE_TIMER"
    | "UNPAUSE_TIMER"
    | "COMPLETE_ROUND";
  value?: undefined;
};

const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
  const pomodoroReducer = (
    state = initialPomodoro,
    action: REDUCER_ACTION_TYPE
  ) => {
    switch (action.type) {
      case "START_ROUND":
        return { ...state, hasStarted: true, roundComplete: false };
      case "COMPLETE_ROUND":
        return { ...state, roundComplete: true };
      case "PAUSE_TIMER":
        return { ...state, isPaused: true };
      case "UNPAUSE_TIMER":
        return { ...state, isPaused: false };
      case "RESET_ROUND":
        return initialPomodoro;
      case "START_BREAK":
        if (state.breakCount > 3) {
          return { ...state, isBreak: true, breakCount: 0 };
        }
        return { ...state, isBreak: true, breakCount: state.breakCount + 1 };
      case "END_BREAK":
        return {
          ...state,
          isBreak: false,
        };
      default:
        return initialPomodoro;
    }
  };

  const [pomodoro, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    initialPomodoro
  );

  const { seconds, resetTimer } = useTimer(
    pomodoro as Pomodoro,
    () => {
      console.log("task complete callback");
      pomodoroDispatch({ type: "COMPLETE_ROUND" });
      if (!pomodoro.isBreak) {
        pomodoroDispatch({ type: "START_BREAK" });
      } else {
        pomodoroDispatch({ type: "END_BREAK" });
      }
    },
    () => {
      console.log("round complete callback");
      pomodoroDispatch({ type: "START_ROUND" });
    }
  );

  const time = {
    minutes: Math.floor((seconds / 60) % 60),
    seconds: seconds % 60,
  };

  const data = { pomodoro, pomodoroDispatch, time, resetTimer };
  console.log(pomodoro);
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
