import refetch from "@hazelee/refetch";
import fetch from "node-fetch";
export const addTracksToPlaylist: addTracksToPlaylistT = async (
  parent,
  { tracks, playlist_id, position },
  context
) => {
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        content_type: "application/json"
      },
      body: position // optional
        ? JSON.stringify({ uris: tracks, position })
        : JSON.stringify({ uris: tracks })
    }
  );
  if (resp.status !== 201) throw new Error((await resp.json()).error.message);
  return await resp.json();
};
type addTracksToPlaylistT = (
  parent: any, // query root
  args: {
    tracks: string[]; // uri[]
    playlist_id: string;
    position: number; // offset, defaults to appending
  },
  context: any
) => Promise<{ snapshot_id: string }>;
