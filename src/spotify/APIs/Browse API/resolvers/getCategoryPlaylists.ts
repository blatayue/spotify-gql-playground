import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-categories
Get a Category's Playlists
Get a list of Spotify playlists tagged with a particular category.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
category_id: The Spotify category ID for the category.

QUERY PARAMETERS:
country: A country: an ISO 3166-1 alpha-2 country code. 
    Provide this parameter if you want to narrow the list of returned categories 
    to those relevant to a particular country. 
    If omitted, the returned items will be globally relevant. String - Optional
limit: The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.	Integer	Optional
offset: The index of the first item to return. Default: 0 (the first object). 
    Use with limit to get the next set of items.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an array of simplified playlist objects 
    (wrapped in a paging object) in JSON format
    
    On error, the header status code is an error code and the response body contains an error object.

    Once you have retrieved the list, you can use Get a Playlist and Get a Playlist’s Tracks to drill down further.
*/

type getCategoryPlaylists = (
  parent: any, // query root
  args: {
    category_id: string;
    country?: string;
    limit?: number;
    offset?: number;
  },
  context: any
) => Promise<object>;

export const getCategoryPlaylists: getCategoryPlaylists = async (
  parent,
  { category_id, country, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { country, limit, offset },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/browse/categories/${category_id}/playlists${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
