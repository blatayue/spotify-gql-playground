import fetch from "node-fetch";
import { UserInputError, ForbiddenError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-remove-tracks-playlist
Remove Items from a Playlist
Remove one or more items from a user’s playlist.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

REQUIRED SCOPES: playlist-modify-public and/or playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist


JSON BODY PARAMETER - [Implementation as is the option with lower priority, yet more functionality]
tracks: An array of objects containing Spotify URIs of the tracks or episodes to remove. 
    For example: 
    { "tracks": [
            { "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },
            { "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }
        ] 
    }. 
    A maximum of 100 objects can be sent at once.
position: The position to insert the items, a zero-based index. 
		For example, to insert the items in the first position: position=0 ; 
		to insert the items in the third position: position=2. 
		If omitted, the items will be appended to the playlist. 
		Items are added in the order they appear in the uris array. 
		For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}
snapshot_id: The playlist’s snapshot ID against which you want to make the changes. 
            The API will validate that the specified items exist and in the specified positions 
            and make the changes, even if more recent changes have been made to the playlist.	
Response: On success, the HTTP status code in the response header is 200 OK. 
		The response body contains a snapshot_id in JSON format. 
		The snapshot_id can be used to identify your playlist version in future requests. .
    
	On error, the header status code is an error code and the response body contains an error object.
	Trying to add an item when you do not have the user’s authorization, or when there are more than 10.000 items in the playlist, returns error 403 Forbidden.
*/

type removeItemsFromPlaylist = (
  parent: any, // query root
  args: {
    uris: string[]; // uri[]
    playlist_id: string;
    snapshot_id: string;
  },
  context: any
) => Promise<{ snapshot_id: string }>;

export const removeItemsFromPlaylist: removeItemsFromPlaylist = async (
  parent,
  { uris, playlist_id, snapshot_id },
  context
) => {
  const items = uris.map((uri) => ({ uri })); //expand into object array because API
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ tracks: items, snapshot_id }),
    }
  );
  if (resp.status === 403) {
    throw new ForbiddenError("you do not have the user’s authorization");
  }
  if (resp.status !== 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
