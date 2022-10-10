import React, { createContext, useContext, useState } from "react";

const SpotifyContext = createContext<
  | { spotifyActive: string; loadPlaylist: (playlist: string) => void }
  | undefined
>(undefined);

const SpotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [spotifyActive, setSpotifyActive] = useState("0vvXsWCC9xrXsKd4FyS8kM");

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
