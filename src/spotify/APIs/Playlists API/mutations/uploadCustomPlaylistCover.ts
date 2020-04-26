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

export const uploadCustomPlaylistCoverGQL = gql`
  extend type Mutation {
    uploadCustomPlaylistCover(
      playlist_id: String!
      image: String
      image_url: String
    ): Boolean
  }
`;

type uploadCustomPlaylistCover = (
  parent: any, // query root
  args: {
    playlist_id: string;
    image: string;
    image_url: string;
  },
  context: any
) => Promise<boolean>;

const urlToBase64 = async (url) => {
  let res = await fetch(url);
  return (await res.buffer()).toString("base64");
};

export const uploadCustomPlaylistCover: uploadCustomPlaylistCover = async (
  parent,
  { playlist_id, image, image_url },
  context
) => {
  const imgSent = image ?? (await urlToBase64(image_url));
  // If we are given the b64 string, use it, it's less network calls
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/images`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        "content-type": "image/jpeg",
      },
      body: imgSent,
    }
  );
  if (resp.status === 202 /* created */) {
    return true;
  } else {
    throw new UserInputError(
      `${(await resp.json()).error.message} Be sure image is jpeg format`
    ); // it's probably your fault
  }
};
