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
    getWaveForm(id: String): [Float]
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

interface analysisdata {
  bars: [any];
  beats: [any];
  meta: any;
  sections: [any];
  segments: [
    {
      loudness_max: number;
      start: number;
      duration: number;
    }
  ];
  tatums: [any];
  track: {
    duration: number;
  };
}

export const getWaveForm = async (parent, { id }, context) => {
  const analysis: any = await getAudioAnalysis(parent, { id }, context);
  const data: analysisdata = analysis;
  const segments = data.segments.map((segment) => ({
    start: segment.start / data.track.duration,
    duration: segment.duration / data.track.duration,
    loudness: 1 - Math.min(Math.max(segment.loudness_max, -32), 0) / -32,
  }));
  const min = Math.min(...segments.map((segment) => segment.loudness));
  const max = Math.max(...segments.map((segment) => segment.loudness));
  console.log(id, min, max);
  // smooth, sleek, illelgible
  const waveform = Array(1000)
    .fill(0)
    .map(
      (_, i) =>
        Math.round(
          (segments.find(
            (segment) => i / 1000 <= segment.start + segment.duration
          ).loudness /
            max) *
            100
        ) / 100
    );

  return waveform;
};
