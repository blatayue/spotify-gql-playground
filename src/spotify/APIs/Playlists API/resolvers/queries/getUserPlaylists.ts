import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-list-users-playlists
Get a List of a User's Playlists
Get a list of the playlists owned or followed by a Spotify user.

REQUIRED SCOPES: playlist-read-private and/or playlist-read-collaborative
HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
{user_id}: The user’s Spotify user ID.

QUERY PARAMETERS:
limit: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.	
offset: The index of the first playlist to return. 
        Default: 0 (the first object). Maximum offset: 100,000. 
        Use with limit to get the next set of playlists.
Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an array of simplified playlist objects 
    (wrapped in a paging object) in JSON format. 
    
    On error, the header status code is an error code and the response body contains an error object.
*/

type getUserPlaylists = (
  parent: any, // query root
  args: {
    user_id: string;
    limit?: number;
    offset?: number;
  },
  context: any
) => Promise<object>;

export const getUserPlaylists: getUserPlaylists = async (
  parent,
  { user_id, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { limit, offset },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/users/${user_id}/playlists${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
