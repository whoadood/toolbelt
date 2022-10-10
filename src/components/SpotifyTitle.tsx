import { useSpotify } from "../hooks/useSpotify";

const SpotifyTitle = () => {
  const { spotifyActive, loadPlaylist } = useSpotify();
  return (
    <div className="rounded-tl rounded-tr bg-green-900 p-2">
      {[
        {
          text: "hip-hop",
          url: "0vvXsWCC9xrXsKd4FyS8kM",
        },
        {
          text: "sleep/rain",
          url: "35xI4hSJ8MdO1xkXwsd56a",
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
