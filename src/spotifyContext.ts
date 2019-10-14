import cookie from "cookie";
import { decode } from "jwt-simple";
import SpotifyWebApi from "spotify-web-api-node";

const clientSecretAndId = {
  clientId: process.env.spotify_client_id,
  clientSecret: process.env.spotify_client_secret
};

const withKnownTokens = ({ token }) => ({
  accessToken: token.access_token,
  refreshToken: token.refresh_token
});
const withRefreshAndNewAccessToken = ({ token, new_access_token }) => ({
  refreshToken: token.refresh_token,
  accessToken: new_access_token
});

interface jwtPayloadSpotify {
  access_token: string;
  refresh_token: string;
  scope: string;
}
export const spotifyContext = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie);
  const spotify_jwt = cookies.spotify_auth || "";
  console.log("includes jwt:", !!spotify_jwt);
  try {
    const token = <jwtPayloadSpotify>(
      decode(spotify_jwt, process.env.jwt_secret, false, "HS256")
    );
    return {
      spotify: new SpotifyWebApi({
        ...clientSecretAndId,
        ...withKnownTokens({ token })
      })
    };
  } catch (e) {
    console.error(e);
    if (e === "Token expired") {
      console.log('refreshing token')
      // skip verify sig by passing true to get old access/refresh tokens to refresh access token
      // if somebody adds or modifies the payload here idc, tokens are the only thing used atm
      // attack surface seems quite limited
      const token = <jwtPayloadSpotify>(
        decode(spotify_jwt, process.env.jwt_secret, true, "HS256")
      );
      const webAPI = new SpotifyWebApi({
        ...clientSecretAndId,
        ...withKnownTokens({ token })
      });
      // pull access token from body of (resolved) refresh of access token
      const new_access_token = (await webAPI.refreshAccessToken()).body
        .access_token;
      // return refreshed user authed api
      return {
        spotify: new SpotifyWebApi({
          ...clientSecretAndId,
          ...withRefreshAndNewAccessToken({ token, new_access_token })
        })
      };
    }
    console.error(spotify_jwt, e);
    return { spotify: new SpotifyWebApi({ ...clientSecretAndId }) }; // no user tokens, but still api access
  }
};
