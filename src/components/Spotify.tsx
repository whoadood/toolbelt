import React, { LegacyRef, useCallback, useRef } from "react";
import { useSpotify } from "../hooks/useSpotify";

export default function Spotify() {
  const searchRef = useRef<React.MutableRefObject<HTMLInputElement>>();
  const { spotifyActive, loadPlaylist } = useSpotify();

  const submit = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("search ref", searchRef?.current?.value);
    loadPlaylist(searchRef?.current?.value as string);
  }, []);

  return (
    <div>
      <div className="max-w-[400px]">
        <iframe
          src={spotifyActive}
          width="100%"
          height="380"
          allow="autoplay; clipboard-write; encrypted-media; volume; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div className="rounded-b px-2 py-2 bg-slate-600">
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit(e);
            }
          }}
          onSubmit={submit}
        >
          <input
            ref={searchRef}
            className="bg-slate-800 w-full outline-none w-64 rounded font-normal py-1 px-2 focus:outline-white"
            placeholder="Enter a Spotify playlist URL"
          />
        </form>
      </div>
    </div>
  );
}
