import refetch from "@hazelee/refetch";
import qs from "qs";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#category-albums
Get an Album's Tracks
Get Spotify catalog information about an album’s tracks. 
  Optional parameters can be used to limit the number of tracks returned.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETERS:
id:  The Spotify ID of the album

QUERY PARAMETERS:
limit: The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
market: The market you’d like to request. Synonym for country.
offset: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking.

Response: On success, the HTTP status code in the response header is 200 OK
        and the response body contains an object whose key is "albums" and whose value
        is an array of album objects in JSON format.

On success, the HTTP status code in the response header is 200 OK 
and the response body contains an album object in JSON format. 
On error, the header status code is an error code and the response body contains an error object.
*/

type getAlbumTracks = (
  parent: any, // query root
  args: {
    id: string;
    market?: string;
    limit?: string;
    offset?: string;
  },
  context: any
) => Promise<object>;

export const getAlbumTracks: getAlbumTracks = async (
  parent,
  { id, market, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { market, offset, limit },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  console.log(`https://api.spotify.com/v1/albums/${id}/tracks${qstring}`);
  return await refetch(
    `https://api.spotify.com/v1/albums/${id}/tracks${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  ).json();
};
