import refetch from "@hazelee/refetch";
import qs from "qs";
import fetch from "node-fetch";

// Get Information About The User's Current Playback
/*
Get information about the user’s current playback state, including track, track progress, and active device.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:

market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. Optional

Response: A successful request will return a 200 OK response code with a json payload 
            that contains information about the current playback. 
            The information returned is for the last known state, 
            which means an inactive device could be returned 
            if it was the last one to execute playback. 

When no available devices are found, the request will return a 200 OK response but with no data populated.
*/

type currentPlayback = (
  parent: any, // query root
  args: {
    market?: string;
  },
  context: any
) => Promise<object>;

export const getCurrentPlayback: currentPlayback = async (
  parent,
  { market },
  context
) => {
  const qstring = qs.stringify(
    { market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await refetch(`https://api.spotify.com/v1/me/player${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  resp;
  try {
    return await resp.json();
  } catch (e) {
    return null;
  }
};
