import qs from "qs";
import fetch from "node-fetch";
import { ForbiddenError, UserInputError } from "apollo-server-micro";
// Add an item to the end of the user's current playback queue.
/*
Add an item to the end of the user’s current playback queue.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:

uri: The uri of the item to add to the queue. Must be a track or an episode uri. Required

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

type addToQueue = (
  parent: any, // query root
  args: {
    uri: string;
    device_id?: string;
  },
  context: any
) => Promise<boolean> | Error;

export const addToQueue: addToQueue = async (
  parent,
  { device_id, uri },
  context
) => {
  const qstring = qs.stringify(
    { device_id, uri },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/queue${qstring}`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  console.log(await resp.text());

  if (resp.status === 204) return true;
  else if (resp.status === 403) throw new ForbiddenError("User is not premium");
  else if (resp.status === 404) throw new UserInputError("Device not Found");
  return null;
};
