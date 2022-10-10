export type Todo = {
  id?: string;
  text: string;
  currentRound: number;
  complete: boolean;
  totalRounds: number;
};
export type Pomodoro = {
  pom: number;
  short: number;
  long: number;
  hasStarted: boolean;
  isBreak: boolean;
  isPaused: boolean;
  roundComplete: boolean;
  breakCount: number;
};
export type Quote = {
  id: number;
  quote: string;
  source: string;
  link: string;
};
