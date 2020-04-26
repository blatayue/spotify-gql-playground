import fetch from "node-fetch";
import qs from "qs";
import { UserInputError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-playlist-cover
Get a Playlist Cover Image
Get the current image associated with a specific playlist.

HEADER:
Authorization: A valid user access token	String	Required

PATH PARAMETER:
{playlist_id}: The Spotify ID for the playlist

Response: On success, the response body contains a list of image objects in JSON format 
    and the HTTP status code in the response header is 200 OK 
    
    On error, the header status code is an error code and the response body contains an error object.
*/

export const getPlaylistCoverImageGQL = gql`
  extend type Query {
    getPlaylistCoverImage(playlist_id: String!): [ImageObject]
  }
`;

type getPlaylistCoverImage = (
  parent: any, // query root
  args: {
    playlist_id: string;
  },
  context: any
) => Promise<object>;

export const getPlaylistCoverImage: getPlaylistCoverImage = async (
  parent,
  { playlist_id },
  context
) => {
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/images`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
