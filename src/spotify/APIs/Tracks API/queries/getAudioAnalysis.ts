import fetch from "node-fetch";
import { UserInputError, gql } from "apollo-server-micro";
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

export const getAudioAnalysisGQL = gql`
  extend type Query {
    """

    """
    getAudioAnalysis(id: String): AudioAnalysisObject
  }
`;

type getAudioAnalysis = (
  parent: any, // query root
  args: {
    id: string;
  },
  context: any
) => Promise<object>;

export const getAudioAnalysis: getAudioAnalysis = async (
  parent,
  { id },
  context
) => {
  const resp = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
