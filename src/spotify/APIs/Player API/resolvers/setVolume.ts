import qs from "qs";
import fetch from "node-fetch";
import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";
// Set Volume For User's Playback
/*
Set the volume for the user’s current playback device.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
volume_percent: The volume to set. Must be a value from 0 to 100 inclusive.

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

type setVolume = (
  parent: any, // query root
  args: {
    volume_percent: number;
    device_id?: string;
  },
  context: any
) => Promise<boolean> | Error;

export const setVolume: setVolume = async (
  parent,
  { volume_percent, device_id },
  context
) => {
  const qstring = qs.stringify(
    { device_id, volume_percent },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/volume${qstring}`,
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
