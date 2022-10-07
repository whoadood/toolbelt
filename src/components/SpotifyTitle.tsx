const SpotifyTitle = ({
  spotifyActive,
  setSpotifyActive,
}: {
  spotifyActive: string;
  setSpotifyActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
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
          className={`flex  ${
            spotifyActive === playlist.url ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setSpotifyActive(playlist.url)}
          key={playlist.text}
        >
          {playlist.text}
        </button>
      ))}
    </>
  );
};

export default SpotifyTitle;
