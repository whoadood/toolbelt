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
          src={`https://open.spotify.com/embed/playlist/${spotifyActive}?utm_source=generator&theme=0`}
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
            className="w-full rounded bg-black/50 py-1 px-2 text-sm font-normal outline-none focus:outline-white"
            placeholder={`Playlist ID: ${spotifyActive}`}
          />
        </form>
      </div>
    </div>
  );
}
