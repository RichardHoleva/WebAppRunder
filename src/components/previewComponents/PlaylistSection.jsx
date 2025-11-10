import React from 'react';

function PlaylistSection({ playlistUrl }) {
  // Extract playlist ID from Spotify URL
  // Format: https://open.spotify.com/playlist/PLAYLIST_ID
  const getPlaylistId = (url) => {
    if (!url) return null;
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const playlistId = getPlaylistId(playlistUrl);

  return (
    <div className="playlist-section">
      <h3>
        <i className="fa-brands fa-spotify"></i> Event Music Playlist
      </h3>
      
      {playlistId ? (
        <div className="spotify-embed">
          <iframe
            style={{ borderRadius: '12px', border: 'none' }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="playlist-card">
          <p>No playlist available for this event</p>
        </div>
      )}
    </div>
  );
}

export default PlaylistSection;