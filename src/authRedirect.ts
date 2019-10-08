import { send, RequestHandler } from "micro";
import querystring from "querystring";

const handler: RequestHandler = (req, res) => {
  const qs = querystring.stringify({
    response_type: "code",
    client_id: process.env.spotify_client_id,
    scope: `playlist-modify-private playlist-read-private user-library-read user-top-read`,
    redirect_uri: `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/callback/`
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${qs}`;
  console.log(req.headers);

  res.setHeader("Location", redirectUrl);
  send(res, 301);
};

export default handler;
