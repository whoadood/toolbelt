import { createContext, useContext, useReducer } from "react";
import { Pomodoro } from "../types/global";
import useTimer from "./useTimer";
import { useTodos } from "./useTodos";

const initialPomodoro: Pomodoro = {
  pom: 25,
  short: 5,
  long: 15,
  hasStarted: false,
  isBreak: false,
  isPaused: false,
  roundComplete: false,
  breakCount: 0,
  activeTodo: undefined,
};

const PomodoroContext = createContext<
  | {
      pomodoro: Pomodoro | undefined;
      pomodoroDispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
      time: {
        minutes: number;
        seconds: number;
      };
      resetTimer: (pomodoro: Pomodoro) => void;
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
    | "COMPLETE_ROUND"
    | "UPDATE_ACTIVE"
    | "INCREMENT_POMODORO"
    | "DECREMENT_POMODORO"
    | "INCREMENT_SHORT"
    | "DECREMENT_SHORT"
    | "INCREMENT_LONG"
    | "DECREMENT_LONG"
    | "INITIAL_POMODORO";
  value?: undefined;
};

const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
  const { todos, todosDispatch } = useTodos();
  const pomodoroReducer = (
    state = initialPomodoro,
    action: REDUCER_ACTION_TYPE
  ) => {
    switch (action.type) {
      case "START_ROUND":
        return {
          ...state,
          hasStarted: true,
          roundComplete: false,
          activeTodo: todos.find((td) => td.currentRound < td.totalRounds)?.id,
        };
      case "COMPLETE_ROUND":
        return { ...state, roundComplete: true };
      case "UPDATE_ACTIVE":
        return {
          ...state,
          activeTodo: todos.find((td) => td.currentRound < td.totalRounds)?.id,
        };
      case "PAUSE_TIMER":
        return { ...state, isPaused: true };
      case "UNPAUSE_TIMER":
        return { ...state, isPaused: false };
      case "RESET_ROUND":
        return {
          ...initialPomodoro,
          pom: state.pom,
          short: state.short,
          long: state.long,
        };
      case "START_BREAK":
        if (state.breakCount > 3) {
          return { ...state, isBreak: true, breakCount: 1 };
        }
        return { ...state, isBreak: true, breakCount: state.breakCount + 1 };
      case "END_BREAK":
        return {
          ...state,
          isBreak: false,
        };
      case "INCREMENT_POMODORO":
        return { ...state, pom: state.pom === 60 ? state.pom : state.pom + 1 };
      case "DECREMENT_POMODORO":
        return { ...state, pom: state.pom === 1 ? state.pom : state.pom - 1 };
      case "INCREMENT_SHORT":
        return {
          ...state,
          short: state.short === 60 ? state.short : state.short + 1,
        };
      case "DECREMENT_SHORT":
        return {
          ...state,
          short: state.short === 1 ? state.short : state.short - 1,
        };
      case "INCREMENT_LONG":
        return {
          ...state,
          long: state.long === 60 ? state.long : state.long + 1,
        };
      case "DECREMENT_LONG":
        return {
          ...state,
          long: state.long === 1 ? state.long : state.long - 1,
        };
      case "INITIAL_POMODORO":
        return initialPomodoro;
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
      pomodoroDispatch({ type: "COMPLETE_ROUND" });
      if (pomodoro.activeTodo && !pomodoro.isBreak) {
        todosDispatch({ type: "COMPLETE_TODO", value: pomodoro.activeTodo });
      }
      if (!pomodoro.isBreak) {
        pomodoroDispatch({ type: "START_BREAK" });
      } else {
        pomodoroDispatch({ type: "END_BREAK" });
      }
    },
    () => {
      pomodoroDispatch({ type: "START_ROUND" });
    }
  );

  const time = {
    minutes: Math.floor((seconds / 60) % 60),
    seconds: seconds % 60,
  };

  const data = { pomodoro, pomodoroDispatch, time, resetTimer };
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
