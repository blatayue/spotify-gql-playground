import fetch from "node-fetch";
import { UserInputError, ForbiddenError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-add-tracks-to-playlist
Add Items to a Playlist
Add one or more items to a user’s playlist.
HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

REQUIRED SCOPES: playlist-modify-public and/or playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist


QUERY PARAMETERS:
uri: A comma-separated list of Spotify URIs to add, can be track or episode URIs. For example:
        uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M,
        spotify:episode:512ojhOuo1ktJprKbVcKyQ
		A maximum of 100 items can be added in one request. 
		Note: it is likely that passing a large number of item URIs as a query parameter 
		will exceed the maximum length of the request URI. 
		When adding a large number of items it is recommended to pass them in the request body, see below.	String	Optional

position: The position to insert the items, a zero-based index. 
		For example, to insert the items in the first position: position=0; 
		to insert the items in the third position: position=2 . 
		If omitted, the items will be appended to the playlist. 
		Items are added in the order they are listed in the query string or request body.

JSON BODY PARAMETER - [Implementation as is the option with lower priority, yet more functionality]
uris: A JSON array of the Spotify URIs to add. 
	For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"]}
	A maximum of 100 items can be added in one request. 
	Note: if the uris parameter is present in the query string, any URIs listed here in the body will be ignored.
position: The position to insert the items, a zero-based index. 
		For example, to insert the items in the first position: position=0 ; 
		to insert the items in the third position: position=2. 
		If omitted, the items will be appended to the playlist. 
		Items are added in the order they appear in the uris array. 
		For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}
	
Response: On success, the HTTP status code in the response header is 201 Created. 
		The response body contains a snapshot_id in JSON format. 
		The snapshot_id can be used to identify your playlist version in future requests. .
    
	On error, the header status code is an error code and the response body contains an error object.
	Trying to add an item when you do not have the user’s authorization, or when there are more than 10.000 items in the playlist, returns error 403 Forbidden.
*/

export const addItemsToPlaylistGQL = gql`
  extend type Mutation {
    addItemsToPlaylist(
      playlist_id: String!
      items: [String]!
      position: Int
    ): SnapshotResponse
  }
`;

type addItemsToPlaylist = (
  parent: any, // query root
  args: {
    items: string[]; // uri[]
    playlist_id: string;
    position?: number; // offset, defaults to appending
  },
  context: any
) => Promise<{ snapshot_id: string }>;

export const addItemsToPlaylist: addItemsToPlaylist = async (
  parent,
  { items, playlist_id, position },
  context
) => {
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ uris: items, position }),
    }
  );
  if (resp.status === 403) {
    throw new ForbiddenError(
      "you do not have the user’s authorization, or there are more than 10.000 items in the playlist"
    );
  }
  if (resp.status !== 201)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
