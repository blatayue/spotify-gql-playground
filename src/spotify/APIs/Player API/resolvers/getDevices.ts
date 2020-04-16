import refetch from "@hazelee/refetch";

// Get a User's Available Devices
/*
Get information about a user’s available devices.

Authorization: A valid user access token or your client credentials.	String	Required

Response: A successful request will return a 200 OK response code 
            with a json payload that contains the device objects (see below). 
            When no available devices are found, 
            the request will return a 200 OK response with an empty devices list.
*/

type getDevices = (
  parent: any, // query root
  args: {},
  context: any
) => Promise<object>;

export const getDevices: getDevices = async (parent, {}, context) =>
  refetch(`https://api.spotify.com/v1/me/player/devices`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  }).json();
