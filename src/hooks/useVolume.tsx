import React, { createContext, useCallback, useContext, useState } from "react";

const VolumeContext = createContext<
  | {
      volume: number;
      handleVolume: (vol: number) => void;
    }
  | undefined
>(undefined);

const storage = localStorage.getItem("volume");

const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolume] = useState(storage ? +storage : 50);
  const handleVolume = useCallback((vol: number) => {
    setVolume(vol);
    localStorage.setItem("volume", "" + vol);
  }, []);

  const data = {
    volume,
    handleVolume,
  };
  return (
    <VolumeContext.Provider value={data}>{children}</VolumeContext.Provider>
  );
};

const useVolume = () => {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error("useSettings can only be used inside SettingsProvider");
  }
  return context;
};

export { useVolume, VolumeProvider };
