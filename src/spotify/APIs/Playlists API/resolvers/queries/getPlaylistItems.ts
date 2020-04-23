import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-playlists-tracks
Get a Playlist's Items
Get full details of the items of a playlist owned by a Spotify user.

HEADER:
Authorization: A valid user access token	String	Required

PATH PARAMETER:
{playlist_id}: The Spotify ID for the playlist

QUERY PARAMETERS:
limit: The maximum number of items to return. Default: 100. Minimum: 1. Maximum: 100.
offset: The index of the first item to return. Default: 0 (the first object).
market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. 
        For episodes, if a valid user access token is specified in the request header, 
        the country associated with the user account will take priority over this parameter.
    Note: If neither market or user country are provided, the episode is considered unavailable for the client.

Response: On success, the response body contains an array of track objects and episode objects
         (depends on the additional_types parameter), wrapped in a paging object in JSON format 
         and the HTTP status code in the response header is 200 OK. 
         If an episode is unavailable in the given market, its information will not be included in the response. 
         
         On error, the header status code is an error code and the response body contains an error object.
    
    Requesting playlists that you do not have the user’s authorization to access returns error 403 Forbidden.




*/

// TODO: Determine if fields param can be implemented to reduce over-fetching - low priority
type getPlaylistItems = (
  parent: any, // query root
  args: {
    playlist_id: string;
    market?: string;
    limit?: string;
    offset?: number;
  },
  context: any
) => Promise<object>;

export const getPlaylistItems: getPlaylistItems = async (
  parent,
  { playlist_id, market, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { market, offset, limit },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
