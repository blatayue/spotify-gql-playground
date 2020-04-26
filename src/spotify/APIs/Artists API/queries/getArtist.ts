import fetch from "node-fetch";
import { UserInputError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-an-artist
Get an Artist
Get Spotify catalog information for a single artist identified by their unique Spotify ID.

HEADER:
Authorization: A valid user access token	String	Required

PATH PARAMETERS:
id: The Spotify ID of the artist.

Response: On success, the HTTP status code in the response header is 200 OK 
          and the response body contains an artist object in JSON format.

          On error, the header status code is an error code and the response body contains an error object.
*/

export const getArtistGQL = gql`
  extend type Query {
    getArtist(id: String!): ArtistObject
  }
`;

type getArtist = (
  parent: any, // query root
  args: { id: String },
  context: any
) => Promise<object>;

export const getArtist: getArtist = async (parent, { id }, context) => {
  const resp = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
