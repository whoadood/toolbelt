import React, { createContext, useContext, useState } from "react";
import useToggle from "./useToggle";

const SpotifyContext = createContext<
  | { spotifyActive: string; loadPlaylist: (playlist: string) => void }
  | undefined
>(undefined);

const SpotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [spotifyActive, setSpotifyActive] = useState(
    "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
  );

  const loadPlaylist = (playlist: string) => {
    setSpotifyActive(playlist);
  };

  return (
    <SpotifyContext.Provider value={{ spotifyActive, loadPlaylist }}>
      {children}
    </SpotifyContext.Provider>
  );
};

const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useInputTodo can only be used inside InputTodoProvider");
  }
  return context;
};

export { useSpotify, SpotifyProvider };
