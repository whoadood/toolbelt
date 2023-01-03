export type Todo = {
  id: string;
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
  activeTodo: string | undefined;
};
export type Quote = {
  text: string;
  author: string;
};
export type Wow = {
  movie: string;
  year: number;
  release_date: string;
  director: string;
  character: string;
  movie_duration: string;
  timestamp: string;
  full_line: string;
  current_wow_in_movie: number;
  total_wows_in_movie: number;
  poster: string;
  video: {
    "1080p"?: string;
    "720p"?: string;
    "480p"?: string;
    "360p"?: string;
  };
  audio: string;
};
export type Note = {
  id: string;
  text: string;
  startX?: number;
  startY?: number;
};
