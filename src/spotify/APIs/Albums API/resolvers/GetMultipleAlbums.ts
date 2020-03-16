import refetch from "@hazelee/refetch";
import qs from "qs";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#category-albums
Get Multiple Albums
Get Spotify catalog information for multiple albums identified by their Spotify IDs.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
ids:  A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. Optional

Response: On success, the HTTP status code in the response header is 200 OK
        and the response body contains an object whose key is "albums" and whose value
        is an array of album objects in JSON format.

Objects are returned in the order requested. If an object is not found, a null value is returned in the appropriate position.
Duplicate ids in the query will result in duplicate objects in the response.
On error, the header status code is an error code and the response body contains an error object.
*/

type getMultipleAlbums = (
  parent: any, // query root
  args: {
    ids: string[]; // uri[]
    market?: string;
  },
  context: any
) => Promise<object>;

export const getMultipleAlbums: getMultipleAlbums = async (
  parent,
  { ids, market },
  context
) => {
  const qstring = qs.stringify(
    { ids, market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  return await refetch(`https://api.spotify.com/v1/albums${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
  }).json();
};
