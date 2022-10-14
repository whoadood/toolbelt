import React, { createContext, useCallback, useContext, useState } from "react";
import useOwen from "../hooks/useOwen";

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
  const { owen, randomWow, activeWow } = useOwen();
  const handleVolume = useCallback(
    (vol: number) => {
      setVolume(vol);
      const audio = new Audio(activeWow);
      audio.volume = 0.01 * volume;
      audio.play();
      if (owen.data) {
        randomWow(owen.data);
      }
      localStorage.setItem("volume", "" + vol);
    },
    [volume]
  );

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
