import qs from "qs";
import fetch from "node-fetch";
import { ForbiddenError, UserInputError } from "apollo-server-micro";
// Pause a User's Playback
/*
Pause playback on the user’s account.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:

device_id: The id of the device this command is targeting. 
        If not supplied, the user’s currently active device is the target. Optional

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
    device_id?: string;
  },
  context: any
) => Promise<boolean> | Error;

export const setPlaybackPause: devicePlayback = async (
  parent,
  { device_id },
  context
) => {
  const qstring = qs.stringify(
    { device_id },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/pause${qstring}`,
    {
      method: "PUT",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  console.log(await resp.text());

  if (resp.status === 204) return true;
  else if (resp.status === 403) throw new ForbiddenError("User is not premium");
  else if (resp.status === 404) throw new UserInputError("Device not Found");
  return null;
};
