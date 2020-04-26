import fetch from "node-fetch";
import { UserInputError, ForbiddenError, gql } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-create-playlist
Create a Playlist
Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.)

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

SCOPES: [REQUIRED][LOGICAL OR]
        playlist-modify-public
        playlist-modify-private

PATH PARAMETERS:
{playlist_id}:  The Spotify ID for the playlist

JSON BODY PARAMETERS:
name: The name for the new playlist, for example "Your Coolest Playlist".
        This name does not need to be unique; a user may have several playlists with the same name.
 	    String	Optional

public: Defaults to true. If true the playlist will be public, if false it will be private. 
        To be able to create private playlists, 
        the user must have granted the playlist-modify-private	
        Boolean	Optional
collaborative: Defaults to false. If true the playlist will be collaborative. 
        Note that to create a collaborative playlist you must also set public to false. 
        To create collaborative playlists you must have granted 
        playlist-modify-private and playlist-modify-public	Boolean	Optional

description: Value for playlist description as displayed in Spotify Clients and in the Web API.	String	Optional


Response: On success, the HTTP status code in the response header is 200 OK. 
		
	On error, the header status code is an error code and the response body contains an error object.
	Trying to set an item when you do not have the user’s authorization, or when there are more than 10.000 items in the playlist, returns error 403 Forbidden.
*/

export const createPlaylistGQL = gql`
  extend type Mutation {
    createPlaylist(
      user_id: String!
      name: String
      public: Boolean
      collaborative: Boolean
      description: String
    ): PlaylistObject
  }
`;

type createPlaylist = (
  parent: any, // query root
  args: {
    user_id: string;
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  },
  context: any
) => Promise<boolean | Error>;

export const createPlaylist: createPlaylist = async (parent, args, context) => {
  const { name, description, collaborative, user_id } = args;
  const resp = await fetch(
    `https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${context.spotify.getAccessToken()}`,
        content_type: "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        // public is a reserved word in strict mode, prop assign w/ variable name doesn't work for it
        public: args.public,
        collaborative,
      }),
    }
  );
  if (resp.status === 403) {
    // Wrong user/no auth scopes
    throw new ForbiddenError("you do not have the user’s authorization");
  }
  if (resp.status !== 200 && resp.status !== 201)
    throw new UserInputError((await resp.json()).error.message); // Unknown error/400 - assume err json res
  if (resp.status === 200 || resp.status === 201) return await resp.json(); // success
};
