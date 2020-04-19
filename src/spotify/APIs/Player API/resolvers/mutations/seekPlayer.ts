import qs from "qs";
import fetch from "node-fetch";
import { ForbiddenError, UserInputError } from "apollo-server-micro";
// Seek To Position In Currently Playing Track
/*
Seeks to the given position in the user’s currently playing track.

Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
position_ms: The position in milliseconds to seek to. Must be a positive number. 
                Passing in a position that is greater than the length of the track 
                will cause the player to start playing the next song.
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
    position_ms: number;
    percent: number;
  },
  context: any
) => Promise<boolean> | Error;

export const seekPlayer: devicePlayback = async (
  parent,
  { device_id, percent, position_ms },
  context
) => {
  // use percentage if it's there, even if it's 0
  // but prioritize position_ms as it is offical rather than extension
  if ((percent || percent === 0) && !position_ms) {
    const curPlay = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${context.spotify.getAccessToken()}`,
        },
      }
    );
    const jsonRes = await curPlay.json();
    // setting undefined var
    position_ms =
      percent === 0 // 0 / 100 = Infinity in JS ... ok
        ? 0
        : Math.round(jsonRes.item.duration_ms * (percent / 100));
  }

  const qstring = qs.stringify(
    { position_ms, device_id },
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(
    `https://api.spotify.com/v1/me/player/seek${qstring}`,
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
