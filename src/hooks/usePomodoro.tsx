import { createContext, useContext, useEffect, useReducer } from "react";
import { Pomodoro } from "../types/global";
import useTimer from "./useTimer";
import { useTodos } from "./useTodos";
import useOwen from "../hooks/useOwen";
import { useSettings } from "./useSettings";
import { useVolume } from "./useVolume";

const storage = localStorage.getItem("pomodoro-obj");

const initialPomodoro: Pomodoro = {
  pom: storage ? JSON.parse(storage).pom : 25,
  short: storage ? JSON.parse(storage).short : 5,
  long: storage ? JSON.parse(storage).long : 15,
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
  const { activeWow, randomWow, owen } = useOwen();
  const { volume } = useVolume();
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
        const inc = {
          ...state,
          pom: state.pom === 60 ? state.pom : state.pom + 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(inc));
        return inc;
      case "DECREMENT_POMODORO":
        const dec = {
          ...state,
          pom: state.pom === 1 ? state.pom : state.pom - 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(dec));
        return dec;
      case "INCREMENT_SHORT":
        const shortInc = {
          ...state,
          short: state.short === 60 ? state.short : state.short + 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(shortInc));
        return shortInc;
      case "DECREMENT_SHORT":
        const shortDec = {
          ...state,
          short: state.short === 1 ? state.short : state.short - 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(shortDec));
        return shortDec;
      case "INCREMENT_LONG":
        const longInc = {
          ...state,
          long: state.long === 60 ? state.long : state.long + 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(longInc));
        return longInc;
      case "DECREMENT_LONG":
        const longDec = {
          ...state,
          long: state.long === 1 ? state.long : state.long - 1,
        };
        localStorage.setItem("pomodoro-obj", JSON.stringify(longDec));
        return longDec;
      case "INITIAL_POMODORO":
        localStorage.setItem("pomodoro-obj", JSON.stringify(initialPomodoro));
        return initialPomodoro;
      default:
        return initialPomodoro;
    }
  };

  const [pomodoro, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    initialPomodoro
  );

  // countdown logic
  const { seconds, resetTimer } = useTimer(
    pomodoro as Pomodoro,
    // round complete callback
    () => {
      pomodoroDispatch({ type: "COMPLETE_ROUND" });
      let audio = new Audio(activeWow);
      audio.load();
      // volume 0 - 1 range
      audio.volume = volume * 0.01;
      audio.play();
      // if owen has data and alarm is in owen.data(d => d.audio)
      if (owen.data) {
        randomWow(owen.data);
      }
      if (pomodoro.activeTodo && !pomodoro.isBreak) {
        todosDispatch({ type: "COMPLETE_TODO", value: pomodoro.activeTodo });
      }
      if (!pomodoro.isBreak) {
        pomodoroDispatch({ type: "START_BREAK" });
      } else {
        pomodoroDispatch({ type: "END_BREAK" });
      }
    },
    // break complete callback
    () => {
      pomodoroDispatch({ type: "START_ROUND" });
    }
  );

  // convert seconds to stopwatch - mm:ss
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
