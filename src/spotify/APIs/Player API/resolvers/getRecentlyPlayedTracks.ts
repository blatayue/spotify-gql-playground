import qs from "qs";
import fetch from "node-fetch";

import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-recently-played
Get Current User's Recently Played Tracks
Get tracks from the current user’s recently played tracks. Note: Currently doesn’t support podcast episodes.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
type: Object type querying for. Optional
limit: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
after: A Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position. 
        If after is specified, before must not be specified.
before: A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position. 
        If before is specified, after must not be specified.

Response: 
    On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an array of play history objects 
    (wrapped in a cursor-based paging object) in JSON format. 
    The play history items each contain the context the track was played from (e.g. playlist, album), 
    the date and time the track was played, and a track object (simplified). 
    
    On error, the header status code is an error code and the response body contains an error object.
*/

type getRecentlyPlayedTracks = (
  parent: any, // query root
  args: {
    type?: string;
    limit?: number;
    after?: number;
    before?: number;
  },
  context: any
) => Promise<object>;

export const getRecentlyPlayedTracks: getRecentlyPlayedTracks = async (
  parent,
  { type, limit, after, before },
  context
) => {
  const qstring = qs.stringify(
    { type, limit, after, before },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
