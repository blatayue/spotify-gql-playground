import cookie from "cookie";
import { decode } from "jwt-simple";
import SpotifyWebApi from "spotify-web-api-node";

const clientSecretAndId = {
  clientId: process.env.spotify_client_id,
  clientSecret: process.env.spotify_client_secret
};

const withKnownTokens = ({ token }: { token: jwtPayloadSpotify }) => ({
  accessToken: token.access_token,
  refreshToken: token.refresh_token
});
const withRefreshAndNewAccessToken = ({ token, new_access_token }) => ({
  refreshToken: token.refresh_token,
  accessToken: new_access_token
});

type jwtPayloadSpotify = {
  access_token: string;
  refresh_token: string;
  scope: string;
};
export const spotifyContext = async ({ req }) => {
  const tokenHeader = req.headers?.token ?? "";
  console.log("includes jwt:", !!tokenHeader);
  // If cookie spotify_auth exists, decode jwt and use to auth API in context 
  if (tokenHeader !== "") {
    try {
      const token: jwtPayloadSpotify = decode(
        tokenHeader,
        process.env.jwt_secret,
        false,
        "HS256"
      );
      return {
        spotify: new SpotifyWebApi({
          ...clientSecretAndId,
          ...withKnownTokens({ token })
        })
      };
    } 
    // If instead, decoding it returns an error
    catch (e) {
      if (e === "Token expired") {
        console.log(e);
        return; // will cause runtime error bc I don't verify spotify is accessible on ctx obj in resolvers
        // TODO - return expired token/create response for unauthed calls
      }
    }
  } 
  // At this point, the cookie probably doesn't exist, Should probably figure out how to use a serverless func to just redirect
  // Would make this a little simpler and more intutitive for the end users
  else if (!req.headers?.cookie) {
    console.log(`reached playground without auth cookie from ${req.headers["x-real-ip"]}`);
    return { spotify: new SpotifyWebApi({ ...clientSecretAndId }) }; // no user tokens, but still api access
  }
};
