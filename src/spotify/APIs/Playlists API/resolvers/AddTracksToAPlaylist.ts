import refetch from "@hazelee/refetch";

export const addTracksToPlaylist: addTracksToPlaylistT = async (
  parent,
  { tracks, playlist_id, position },
  context
) => await refetch
    .post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        content_type: "application/json"
      },
      body: position // optional
        ? JSON.stringify({ uris: tracks, position })
        : JSON.stringify({ uris: tracks })
    })
    .json();

type addTracksToPlaylistT = (
  parent: any, // query root
  args: {
    tracks: string[]; // uri[]
    playlist_id: string;
    position: number; // offset, defaults to appending
  },
  context: any
) => Promise<{ snapshot_id: string }>;
