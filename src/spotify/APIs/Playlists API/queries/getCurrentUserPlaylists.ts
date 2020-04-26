import fetch from "node-fetch";
import qs from "qs";
import { UserInputError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-a-list-of-current-users-playlistsGet a List of a User's Playlists
Get a list of the playlists owned or followed by the current Spotify user.

SCOPES: 
    [REQUIRED]
        playlist-read-private  
    [OPTIONAL]
        playlist-read-collaborative 
HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

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

export const getCurrentUserPlaylistsGQL = gql`
  extend type Query {
    getCurrentUserPlaylists(limit: Int, offset: Int): PagingObject # UserPlaylistObject
  }
`;

type getCurrentUserPlaylists = (
  parent: any, // query root
  args: {
    limit?: number;
    offset?: number;
  },
  context: any
) => Promise<object>;

export const getCurrentUserPlaylists: getCurrentUserPlaylists = async (
  parent,
  { limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { limit, offset },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/me/playlists${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
