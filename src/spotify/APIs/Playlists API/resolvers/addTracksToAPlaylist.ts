import fetch from "node-fetch";
import { UserInputError, ForbiddenError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-add-tracks-to-playlist
Add Tracks to a Playlist
Add one or more tracks to a user’s playlist.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

REQUIRED SCOPES: playlist-modify-public and/or playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist


QUERY PARAMETERS:
uri: A comma-separated list of Spotify track URIs to add. For example:
		uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M
		A maximum of 100 tracks can be added in one request. 
		Note: it is likely that passing a large number of track URIs as a query parameter 
		will exceed the maximum length of the request URI. 
		When adding a large number of tracks it is recommended to pass them in the request body, see below.	String	Optional

position: The position to insert the tracks, a zero-based index. 
		For example, to insert the tracks in the first position: position=0; 
		to insert the tracks in the third position: position=2 . 
		If omitted, the tracks will be appended to the playlist. 
		Tracks are added in the order they are listed in the query string or request body.

JSON BODY PARAMETER - [Implementation as is the option with lower priority, yet more functionality
uris: A JSON array of the Spotify track URIs to add. 
	For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"]}
	A maximum of 100 tracks can be added in one request. 
	Note: if the uris parameter is present in the query string, any URIs listed here in the body will be ignored.
position: The position to insert the tracks, a zero-based index. 
		For example, to insert the tracks in the first position: position=0 ; 
		to insert the tracks in the third position: position=2. 
		If omitted, the tracks will be appended to the playlist. 
		Tracks are added in the order they appear in the uris array. 
		For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}
	
Response: On success, the HTTP status code in the response header is 201 Created. 
		The response body contains a snapshot_id in JSON format. 
		The snapshot_id can be used to identify your playlist version in future requests. .
    
	On error, the header status code is an error code and the response body contains an error object.
	Trying to add a track when you do not have the user’s authorization, or when there are more than 10.000 tracks in the playlist, returns error 403 Forbidden.
*/

type addTracksToPlaylist = (
  parent: any, // query root
  args: {
    tracks: string[]; // uri[]
    playlist_id: string;
    position: number; // offset, defaults to appending
  },
  context: any
) => Promise<{ snapshot_id: string }>;

export const addTracksToPlaylist: addTracksToPlaylist = async (
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
        content_type: "application/json",
      },
      body: position // optional
        ? JSON.stringify({ uris: tracks, position })
        : JSON.stringify({ uris: tracks }),
    }
  );
  if (resp.status === 403) {
    throw new ForbiddenError(
      "you do not have the user’s authorization, or there are more than 10.000 tracks in the playlist"
    );
  }
  if (resp.status !== 201)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
