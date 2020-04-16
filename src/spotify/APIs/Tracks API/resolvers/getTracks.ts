import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-several-tracksGet a Track
Get Spotify catalog information for multiple tracks based on their Spotify IDs.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
ids:  A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. Optional


Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an object whose key is tracks 
    and whose value is an array of track objects in JSON format.

    On error, the header status code is an error code and the response body contains an error object.
*/

type getTracks = (
  parent: any, // query root
  args: {
    ids: string[];
    market?: string;
  },
  context: any
) => Promise<object>;

export const getTracks: getTracks = async (parent, { ids, market }, context) => {
  const qstring = qs.stringify(
    { ids, market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(`https://api.spotify.com/v1/tracks${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
