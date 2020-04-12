import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-audio-features
Get Audio Features for a Track

Get audio feature information for a single track identified by its unique Spotify ID.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
id: The Spotify ID for the track.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an audio features object in JSON format.

    On error, the header status code is an error code and the response body contains an error object.
*/

type getAudioFeatures = (
  parent: any, // query root
  args: {
    id
  },
  context: any
) => Promise<object>;

export const getAudioFeatures: getAudioFeatures = async (
  parent,
  { id },
  context
) => {

  const resp = await fetch(
    `https://api.spotify.com/v1/audio-features/${id}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
