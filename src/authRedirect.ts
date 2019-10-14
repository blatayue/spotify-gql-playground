import { send, RequestHandler } from "micro";
import querystring from "querystring";

const allScopes = {
  Playlists: [
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-modify-private"
  ],
  SpotifyConnect: [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state"
  ],
  ListeningHistory: ["user-read-recently-played", "user-top-read"],
  Follow: ["user-follow-read", "user-follow-modify"],
  Playback: ["app-remote-control", "streaming"],
  Users: ["user-read-private", "user-read-email"],
  Library: ["user-library-modify", "user-library-read"]
};
const allScopesStr = Object.values(allScopes).reduce((fullScopes, scopeArr) => `${fullScopes} ${scopeArr.join(' ')}`, '')
const handler: RequestHandler = (req, res) => {
  const qs = querystring.stringify({
    response_type: "code",
    client_id: process.env.spotify_client_id,
    scope: allScopesStr,
    redirect_uri: `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/callback/`
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${qs}`;
  console.log(`request from: ${req.headers["x-real-ip"]}`);

  res.setHeader("Location", redirectUrl);
  send(res, 301);
};

export default handler;
