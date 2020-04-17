import qs from "qs";
import fetch from "node-fetch";
import { ForbiddenError, UserInputError } from "apollo-server-micro";
// Pause a User's Playback
/*
https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
Start/Resume a User's Playback

Authorization: A valid user access token or your client credentials.	String	Required
  The access token must have the user-modify-playback-state scope authorized in order to control playback.

QUERY PARAMETERS:

device_id: The id of the device this command is targeting. 
        If not supplied, the user’s currently active device is the target. Optional

BODY PARAMETERS: 
Completely optional, but used to start new playback rather than resume
{
  context_uri?: string 
  uris?: [uri]
  offset?: {
    position?: number
    uri?: string
  }
  position_ms?: number
}
Docs:
context_uri:
    Spotify URI of the context to play.
    Valid contexts are albums, artists, playlists.
    Example: {"context_uri": "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}
uris: 
    A JSON array of the Spotify track URIs to play.
    For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}
offset:
    Indicates from where in the context playback should start.
    Only available when context_uri corresponds to an album or playlist object, or when the uris parameter is used.
    “position” is zero based and can’t be negative. Example: "offset": {"position": 5}
        “uri” is a string representing the uri of the item to start at.
        Example: "offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}
position_ms:
    Indicates from what position to start playback. Must be a positive number.
    Passing in a position that is greater than the length of the track will cause the player to start playing the next song.

[Caveats]
Only one of either context_uri or uris can be specified. 
  If neither is present, calling /play will resume playback. 
  If both are present the request will return 400 BAD REQUEST. 
If context_uri is a Playlist or Album, or when uris is provided, 
  then offset can be added to specify starting track in the context. 
If the provided context_uri corresponds to an album or playlist object, 
    an offset can be specified either by track uri OR position. 
If both are present the request will return 400 BAD REQUEST. 
If incorrect values are provided for position or uri, 
  the request may be accepted but with an unpredictable resulting action on playback.

Response: A completed request will return a 204 NO CONTENT response code, and 
            then issue the command to the player. 
            Due to the asynchronous nature of the issuance of the command, 
            you should use the Get Information About The User’s Current Playback endpoint 
            to check that your issued command was handled correctly by the player.

    If the device is not found, the request will return 404 NOT FOUND response code.

    If the user making the request is non-premium, a 403 FORBIDDEN response code will be returned.
*/

type devicePlayback = (
  parent: any, // query root
  args: {
    device_id: string;
    context_uri?: string;
    uris?: string[];
    offset?: {
      position?: number;
      uri?: string;
    };
    position_ms?: number;
  },
  context: any
) => Promise<boolean> | Error;

export const setPlaybackStartResume: devicePlayback = async (
  parent,
  { context_uri, offset, position_ms, uris, device_id },
  context
) => {
  const qstring = qs.stringify(
    { device_id },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/play${qstring}`,
    {
      method: "PUT",
      body: JSON.stringify({ context_uri, offset, position_ms, uris }),
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );

  if (resp.status === 204) return true;
  else if (resp.status === 403) throw new ForbiddenError("User is not premium");
  else if (resp.status === 404) throw new UserInputError("Device not Found");
  return null;
};
