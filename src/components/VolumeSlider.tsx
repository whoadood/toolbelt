import React from "react";
import { useVolume } from "../hooks/useVolume";
import SettingsHeading from "./SettingsHeading";

export default function VolumeSlider() {
  const { volume, handleVolume } = useVolume();
  return (
    <div className="relative mb-2 pt-1">
      <label htmlFor="volume" className="form-label">
        <SettingsHeading title="Alarm Volume" />
      </label>
      <div className="relative mt-1">
        <input
          type="range"
          value={volume}
          onChange={(e) => handleVolume(+e.currentTarget.value)}
          className="
        
        form-range
        h-6
        w-full
        appearance-none
        bg-transparent
        p-0
        focus:shadow-none focus:outline-none focus:ring-0
        "
          id="volume"
        />
      </div>
      <div className="absolute top-2/3 left-2 right-2 -z-10 h-2 -translate-y-1/3 cursor-pointer rounded bg-black/50">
        <div
          className={`h-full rounded bg-white`}
          style={{ width: `${volume}%` }}
        />
      </div>
    </div>
  );
}
