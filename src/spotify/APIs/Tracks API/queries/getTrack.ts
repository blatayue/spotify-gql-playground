import fetch from "node-fetch";
import qs from "qs";
import { UserInputError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-track
Get a Track
Get Spotify catalog information for a single track identified by its unique Spotify ID.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
id: The Spotify ID for the track.

QUERY PARAMETERS:
market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. Optional


Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains a track object in JSON format.

    On error, the header status code is an error code and the response body contains an error object.
*/

export const getTrackGQL = gql`
  extend type Query {
    """

    """
    getTrack(id: String, market: String): TrackObject
  }
`;

type getTrack = (
  parent: any, // query root
  args: {
    id: string;
    market?: string;
  },
  context: any
) => Promise<object>;

export const getTrack: getTrack = async (parent, { id, market }, context) => {
  const qstring = qs.stringify(
    { market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/tracks/${id}${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
