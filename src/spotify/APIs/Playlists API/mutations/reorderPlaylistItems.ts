import fetch from "node-fetch";
import { UserInputError, ForbiddenError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-reorder-playlists-tracks
Reorder a Playlist's Items
Reorder an item or a group of items in a playlist.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

REQUIRED SCOPES: playlist-modify-public and/or playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist

JSON BODY PARAMETERS:
range_start: The position of the first item to be reordered.	Integer	Required

insert_before: The position where the items should be inserted.
To reorder the items to the end of the playlist, simply set insert_before to the position after the last item.
Examples:
To reorder the first item to the last position in a playlist with 10 items, set range_start to 0, and insert_before to 10.
To reorder the last item in a playlist with 10 items to the start of the playlist, set range_start to 9, and insert_before to 0.	Integer	Required

range_length: The amount of items to be reordered. Defaults to 1 if not set.
The range of items to be reordered begins from the range_start position, and includes the range_length subsequent items.
Example:
To move the items at index 9-10 to the start of the playlist, range_start is set to 9, and range_length is set to 2.	Integer	Optional

snapshot_id: The playlist’s snapshot ID against which you want to make the changes.	String	Optional

Response: On success, the HTTP status code in the response header is 201 Created. 
		The response body contains a snapshot_id in JSON format. 
		The snapshot_id can be used to identify your playlist version in future requests. .
    
	On error, the header status code is an error code and the response body contains an error object.
	Trying to set an item when you do not have the user’s authorization, or when there are more than 10.000 items in the playlist, returns error 403 Forbidden.
*/

export const reorderPlaylistItemsGQL = gql`
  extend type Mutation {
    reorderPlaylistItems(
      playlist_id: String!
      insert_before: Int!
      range_start: Int!
      range_length: Int
      snapshot_id: String
    ): SnapshotResponse
  }
`;

type reorderPlaylistItems = (
  parent: any, // query root
  args: {
    playlist_id: string;
    insert_before: number;
    range_start: number;
    range_length?: number;
    snapshot_id?: string;
  },
  context: any
) => Promise<{ snapshot_id: string }>;

export const reorderPlaylistItems: reorderPlaylistItems = async (
  parent,
  { insert_before, range_start, range_length, playlist_id, snapshot_id },
  context
) => {
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        content_type: "application/json",
      },
      body: JSON.stringify({
        insert_before,
        range_start,
        range_length,
        snapshot_id,
      }),
    }
  );
  if (resp.status === 403) {
    throw new ForbiddenError(
      "you do not have the user’s authorization, or there are more than 10.000 items in the playlist"
    );
  }
  if (resp.status !== 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
