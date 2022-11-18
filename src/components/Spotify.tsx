import React, { MutableRefObject, useCallback, useRef } from "react";
import { useSpotify } from "../hooks/useSpotify";
import useToggle from "../hooks/useToggle";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Spotify() {
  const searchRef = useRef<HTMLInputElement>();
  const { spotifyActive, loadPlaylist } = useSpotify();
  const { toggle, handleToggle } = useToggle();

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
          src={`https://open.spotify.com/embed/playlist/${spotifyActive}?utm_source=generator&theme=0`}
          width="100%"
          height={toggle ? "380" : "80px"}
          allow="autoplay; clipboard-write; encrypted-media; volume; fullscreen; picture-in-picture"
          loading="lazy"
          className="transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="flex rounded-b bg-green-900 px-2 py-2">
        <form
          className="w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit(e);
            }
          }}
          onSubmit={submit}
        >
          <input
            ref={searchRef as MutableRefObject<HTMLInputElement>}
            className="w-full rounded bg-black/50 py-1 px-2 text-sm font-normal outline-none focus:outline-white"
            placeholder={`Playlist ID: ${spotifyActive}`}
          />
        </form>
        <button
          aria-label="toggle show playlist"
          onClick={handleToggle}
          className="ml-2"
        >
          <ChevronDownIcon
            className={`h-6 ${
              toggle ? "rotate-180" : ""
            } rounded-full transition-transform duration-300 ease-in-out`}
          />
        </button>
      </div>
    </div>
  );
}
