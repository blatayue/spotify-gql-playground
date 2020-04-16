import refetch from "@hazelee/refetch";
import qs from "qs";
// Get Audio Features for Several Tracks
/*
Get audio features for multiple tracks based on their Spotify IDs.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
ids:  A comma-separated list of the Spotify IDs for the albums. Maximum: 100 IDs.

Response: On success, the HTTP status code in the response header is 200 OK
            and the response body contains an object 
            whose key is "audio_features" and whose value is 
            an array of audio features objects in JSON format.

Objects are returned in the order requested.
If an object is not found, a null value is returned in the appropriate position. 
Duplicate ids in the query will result in duplicate objects in the response

On error, the header status code is an error code and the response body contains an error object.
*/

type getAudioFeaturesSeveralTracks = (
  parent: any, // query root
  args: {
    ids: string[];
  },
  context: any
) => Promise<object>;

export const getAudioFeaturesSeveralTracks: getAudioFeaturesSeveralTracks = async (
  parent,
  { ids },
  context
) => {
  const qstring = qs.stringify(
    { ids },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = refetch(
    `https://api.spotify.com/v1/audio-features${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  try {
    return await resp.json();
  } catch (e) {
    return null;
  }
};
