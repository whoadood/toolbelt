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
      <div className="rounded-b px-2 py-2 bg-green-900">
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
            className="bg-black/50 w-full outline-none rounded font-normal py-1 px-2 focus:outline-white"
            placeholder="Enter a Spotify playlist URL"
          />
        </form>
      </div>
    </div>
  );
}
