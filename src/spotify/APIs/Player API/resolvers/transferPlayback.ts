import qs from "qs";
import fetch from "node-fetch";
import {
  ApolloError,
  ForbiddenError,
  UserInputError
} from "apollo-server-micro";
// Transfer a User's Playback
/*
Transfer playback to a new device and determine if it should start playing.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
device_ids: A JSON array containing the ID of the device on which playback should be started/transferred.
        For example:{device_ids:["74ASZWbe4lXaubB36ztrGX"]}
        Note: Although an array is accepted, only a single device_id is currently supported. 
        Supplying more than one will return 400 Bad Request
play: 
    true: ensure playback happens on new device.
    false or not provided: keep the current playback state.

Response: A completed request will return a 204 NO CONTENT response code, and 
            then issue the command to the player. 
            Due to the asynchronous nature of the issuance of the command, 
            you should use the Get Information About The User’s Current Playback endpoint 
            to check that your issued command was handled correctly by the player.

    If the device is not found, the request will return 404 NOT FOUND response code.

    If the user making the request is non-premium, a 403 FORBIDDEN response code will be returned.
*/

type transferPlayback = (
  parent: any, // query root
  args: {
    device_ids: string[];
    play?: boolean;
  },
  context: any
) => Promise<boolean> | Error;

export const transferPlayback: transferPlayback = async (
  parent,
  { device_ids, play },
  context
) => {
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player`,
    {
      method: "PUT",
      body: JSON.stringify({ device_ids, play }),
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );

  if (resp.status === 204) return true;
  else if (resp.status === 403) throw new ForbiddenError("User is not premium");
  else if (resp.status === 404) throw new UserInputError("Device not Found");
  return null;
};
