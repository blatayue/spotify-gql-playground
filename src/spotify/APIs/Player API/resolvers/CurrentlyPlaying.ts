import refetch from "@hazelee/refetch";
import qs from "qs";
// Get the User's Currently Playing Track
/*
Get the object currently being played on the user’s Spotify account.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
ids:  A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
market: An ISO 3166-1 alpha-2 country code or the string from_token. 
        Provide this parameter if you want to apply Track Relinking. Optional

Response: A successful request will return a 200 OK response code 
          with a json payload that contains information about 
          the currently playing track and context (see below). 
          The information returned is for the last known state, 
          which means an inactive device could be returned 
          if it was the last one to execute playback.

When no available devices are found, the request will return a 200 OK response but with no data populated.

When no track is currently playing, the request will return a 204 NO CONTENT response with no payload.

If private session is enabled the response will be a 204 NO CONTENT with an empty payload.
*/

type currentlyPlaying = (
  parent: any, // query root
  args: {
    market?: string;
  },
  context: any
) => Promise<object>;

export const getCurrentlyPlaying: currentlyPlaying = async (
  parent,
  { market },
  context
) => {
  const qstring = qs.stringify(
    { market },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = refetch(
    `https://api.spotify.com/v1/me/player/currently-playing${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
    try {
      return await resp.json()
    }
    catch(e) {
      return null
    }

};
