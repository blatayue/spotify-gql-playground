import refetch from "@hazelee/refetch";
import qs from "qs";
import { gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#category-albums
Get an Album
Get Spotify catalog information for a single album.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETERS:
id:  The Spotify ID of the album

QUERY PARAMETERS:
market: The market you’d like to request. Synonym for country.

Response: On success, the HTTP status code in the response header is 200 OK
         and the response body contains an album object in JSON format. 
         On error, the header status code is an error code 
         and the response body contains an error object.
*/

type getAlbum = (
  parent: any, // query root
  args: {
    id: string;
    market?: string;
  },
  context: any
) => Promise<object>;

export const getAlbum: getAlbum = async (parent, { id, market }, context) => {
  const qstring = qs.stringify(
    { market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  return await refetch(`https://api.spotify.com/v1/albums/${id}${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
  }).json();
};
