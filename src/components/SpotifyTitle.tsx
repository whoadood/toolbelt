import { useSpotify } from "../hooks/useSpotify";

const SpotifyTitle = () => {
  const { spotifyActive, loadPlaylist } = useSpotify();
  return (
    <div className="bg-green-900 p-2 rounded-tl rounded-tr">
      {[
        {
          text: "hip-hop",
          url: "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0",
        },
        {
          text: "sleep/rain",
          url: "https://open.spotify.com/embed/playlist/35xI4hSJ8MdO1xkXwsd56a?utm_source=generator&theme=0",
        },
      ].map((playlist) => (
        <button
          className={`flex  ${
            spotifyActive === playlist.url ? "text-white" : "text-gray-400"
          }`}
          onClick={() => loadPlaylist(playlist.url)}
          key={playlist.text}
        >
          {playlist.text}
        </button>
      ))}
    </div>
  );
};

export default SpotifyTitle;
