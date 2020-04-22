import fetch from "node-fetch";
import { UserInputError, ForbiddenError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-change-playlist-details
Change a Playlist's Details
Change a playlist’s name and public/private state. (The user must, of course, own the playlist.)

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

REQUIRED SCOPES: playlist-modify-public and/or playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist

JSON BODY PARAMETERS:
name: The new name for the playlist, for example "My New Playlist Title"	String	Optional

public: If true the playlist will be public, if false it will be private.	Boolean	Optional
collaborative: If true , the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. 
    Note: You can only set collaborative to true on non-public playlists.	Boolean	Optional

description: Value for playlist description as displayed in Spotify Clients and in the Web API.	String	Optional


Response: On success, the HTTP status code in the response header is 200 OK. 
		
	On error, the header status code is an error code and the response body contains an error object.
	Trying to set an item when you do not have the user’s authorization, or when there are more than 10.000 items in the playlist, returns error 403 Forbidden.
*/

type changePlaylistDetails = (
  parent: any, // query root
  args: {
    playlist_id: string;
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  },
  context: any
) => Promise<boolean | Error>;

export const changePlaylistDetails: changePlaylistDetails = async (
  parent,
  //@ts-ignore
  args,
  context
) => {
  const {
    name,
    collaborative,
    description,
    playlist_id,
    ...rest /* <- { public } */
  } = args;
  const isPublic = rest.public;
  const resp = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        content_type: "application/json",
      },
      body: JSON.stringify({
        name,
        //@ts-ignore public is a reserved word in strict mode, but the api uses it...
        public: isPublic,
        collaborative,
        description,
      }),
    }
  );
  if (resp.status === 403) {
    throw new ForbiddenError(
      "you do not have the user’s authorization, or there are more than 10.000 items in the playlist"
    );
  }
  if (resp.status !== 200)
    throw new UserInputError((await resp.json()).error.message);

  if (resp.status === 200) return await true;
};
