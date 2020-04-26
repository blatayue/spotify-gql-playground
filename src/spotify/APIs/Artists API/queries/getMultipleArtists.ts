import fetch from "node-fetch";
import qs from "qs";
import { UserInputError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-multiple-artists
Get Multiple Artists
Get Spotify catalog information for several artists based on their Spotify IDs.

HEADER:
Authorization: A valid user access token	String	Required

QUERY PARAMETERS:
ids: A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs. 

Response: On success, the HTTP status code in the response header is 200 OK 
          and the response body contains an object whose key is "artists" 
          and whose value is an array of artist objects in JSON format.

          On error, the header status code is an error code and the response body contains an error object.
            
          Objects are returned in the order requested. 
          If an object is not found, a null value is returned in the appropriate position. 
          Duplicate ids in the query will result in duplicate objects in the response.

*/

export const getMultipleArtistsGQL = gql`
  type MultipleArtistsResponse {
    """

    """
    artists: [ArtistObject]
  }
  extend type Query {
    getMultipleArtists(ids: [String]!): MultipleArtistsResponse
  }
`;

type getMultipleArtists = (
  parent: any, // query root
  args: { ids: String[] },
  context: any
) => Promise<object>;

export const getMultipleArtists: getMultipleArtists = async (
  parent,
  { ids },
  context
) => {
  const qstring = qs.stringify(
    { ids },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(`https://api.spotify.com/v1/artists${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
