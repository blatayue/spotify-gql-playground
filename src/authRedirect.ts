import { NowRequest, NowResponse } from "@now/node";
import querystring from "querystring";

const allScopes = {
  Playlists: [
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-modify-private",
  ],
  SpotifyConnect: [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
  ],
  ListeningHistory: ["user-read-recently-played", "user-top-read"],
  Follow: ["user-follow-read", "user-follow-modify"],
  Playback: ["app-remote-control", "streaming"],
  Users: ["user-read-private", "user-read-email"],
  Library: ["user-library-modify", "user-library-read"],
  ImageUpload: ["ugc-image-upload"],
};

//TODO Build endoint specific scope sets and allow for gen auth link w/ min reqs
// join all the scopes to ask for all
//{[API]: scopeStr[]}:: ScopeSpaceSeparatedStr

export const allScopesStr = Object.values(allScopes).reduce(
  // by appending the scopes after a space that are also space joined
  (fullScopes, scopeArr) => `${fullScopes} ${scopeArr.join(" ")}`,
  "" // build a string
);

const handler = (req: NowRequest, res: NowResponse) => {
  console.log(`request from: ${req.headers["x-real-ip"]} for oauth2 link`);
  const qs = querystring.stringify({
    response_type: "code",
    client_id: process.env.spotify_client_id,
    scope: allScopesStr,
    // Like in server.ts, build redirect url dynamically
    redirect_uri: `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/callback/`,
  });

  res.setHeader("Location", `https://accounts.spotify.com/authorize?${qs}`);
  res.status(301).end();
};

export default handler;
