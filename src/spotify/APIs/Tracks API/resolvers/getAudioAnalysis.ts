import fetch from "node-fetch";
import qs from "qs";
import {writeFile, fstat} from 'fs'
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-audio-analysis

Get Audio Analysis for a Track
Get a detailed audio analysis for a single track identified by its unique Spotify ID.


HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
id: The Spotify ID for the track.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains audio analysis object in JSON format.

    On error, the header status code is an error code and the response body contains an error object.
*/

type getAudioAnalysis = (
  parent: any, // query root
  args: {
    id
  },
  context: any
) => Promise<object>;

export const getAudioAnalysis: getAudioAnalysis = async (
  parent,
  { id },
  context
) => {

  const resp = await fetch(
    `https://api.spotify.com/v1/audio-analysis/${id}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  const json = await resp.json()
  writeFile('./analysis.json', JSON.stringify(json), () =>{})
  return json
};
