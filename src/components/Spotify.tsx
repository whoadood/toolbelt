
import React, { Dispatch, SetStateAction } from "react";

export default function Spotify() {
  return (
    <div>
      <div className="p-2 bg-slate-600 rounded-tl rounded-tr">
        {[
          {
            text: "hip-hop",
            url: "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0",
          },
          {
            text: "sleep/rain",
            url: "https://open.spotify.com/embed/playlist/35xI4hSJ8MdO1xkXwsd56a?utm_source=generator",
          },
        ].map((playlist) => (
          <button
            className={`flex`}
            key={playlist.text}
          >
            {playlist.text}
          </button>
        ))}
      </div>
      <div className="max-w-[400px]">
        <iframe
          className="rounded-bl rounded-br"
          src={"https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"}
          width="100%"
          height="380"
          allow="autoplay; clipboard-write; encrypted-media; volume; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}