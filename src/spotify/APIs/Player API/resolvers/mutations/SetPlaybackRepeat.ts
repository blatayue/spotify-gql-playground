import qs from "qs";
import fetch from "node-fetch";
import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";
// Set Repeat Mode On User’s Playback
/*
Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.

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
enum state {
  track,
  context,
  off,
}
type repeatDevicePlayback = (
  parent: any, // query root
  args: {
    device_id?: string;
    state: state;
  },
  context: any
) => Promise<boolean> | Error;

export const setPlaybackRepeat: repeatDevicePlayback = async (
  parent,
  { device_id, state },
  context
) => {
  const qstring = qs.stringify(
    { device_id, state },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/repeat${qstring}`,
    {
      method: "PUT",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );

  if (resp.status === 204) return true;
  else if (resp.status === 403) throw new ForbiddenError("User is not premium");
  else if (resp.status === 404) throw new UserInputError("Device not Found");
  return null;
};
