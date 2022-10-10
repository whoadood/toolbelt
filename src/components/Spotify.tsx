import React, { MutableRefObject, useCallback, useRef } from "react";
import { useSpotify } from "../hooks/useSpotify";

export default function Spotify() {
  const searchRef = useRef<HTMLInputElement>();
  const { spotifyActive, loadPlaylist } = useSpotify();

  const submit = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadPlaylist(
      (searchRef as MutableRefObject<HTMLInputElement>).current.value
    );
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
      <div className="rounded-b bg-green-900 px-2 py-2">
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit(e);
            }
          }}
          onSubmit={submit}
        >
          <input
            ref={searchRef as MutableRefObject<HTMLInputElement>}
            className="w-full rounded bg-black/50 py-1 px-2 font-normal outline-none focus:outline-white"
            placeholder="Enter a Spotify playlist URL"
          />
        </form>
      </div>
    </div>
  );
}
