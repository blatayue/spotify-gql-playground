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

type jwtPayloadSpotify = {
  access_token: string;
  refresh_token: string;
  scope: string;
};
export const spotifyContext = async ({ req }) => {
  const tokenHeader = req.headers?.authorization ?? "";
  console.log("includes jwt:", !!tokenHeader);
  // If auth header exists, decode jwt and use to auth API in context 
  if (tokenHeader !== "") {
    try {
      const token: jwtPayloadSpotify = decode(
        tokenHeader.split(" ")[1],
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
        return; // will cause api dependents to return null for graphql call
        // TODO - return expired token/create response for unauthed calls
      }
    }
  } 
  // At this point, the header probably doesn't exist
  else if (!req.headers?.authorization) {
    console.log(`reached playground without auth from ${req.headers["x-real-ip"]}`);
    return { spotify: new SpotifyWebApi({ ...clientSecretAndId }) }; // no user tokens, but still api access
  }
};
