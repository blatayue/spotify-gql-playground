import query from "micro-query";
import querystring from "querystring";
import fetch from "node-fetch";
import cookie from "cookie";
import { send, RequestHandler } from "micro";
import { sign } from "jsonwebtoken";

// This micro server handles the oauth2 access token flow
// It is called with my custom url from spotify
// It handles the code exchange for an access token and refresh token
// It signs the token response as a jwt and sets it as a cookie
// It finally redirects to the graphql playground

const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
const fetchOpts = ({ code, headers }) => ({
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      `${process.env.spotify_client_id}:${process.env.spotify_client_secret}`
    ).toString("base64")}`
  },
  body: querystring.stringify({
    grant_type: "authorization_code",
    redirect_uri: `${headers["x-forwarded-proto"]}://${headers["x-forwarded-host"]}/callback/`,
    code
  })
});

const sendToPlaygroundWithCookie = ({ req, res }) => spotifyResponse => {
  if (spotifyResponse.error) {
    // retry auth
    console.error(spotifyResponse.error);
    res.setHeader(
      "Location",
      `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/`
    );
    send(res, 301);
  } else {
    // redirect to playground
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(
        "spotify_auth",
        sign(spotifyResponse, process.env.jwt_secret), // make jwt
        {
          expires: new Date("October 11, 2019 19:00:00"),
          path: "/"
        }
      )
    );
    res.setHeader(
      "Location",
      `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/graphql`
    );
    send(res, 301);
  }
};

// TODO: Replace with Algebra
const handler: RequestHandler = async (req, res) => {
  // console.log(req.headers);
  const opts = fetchOpts({ code: query(req).code, headers: req.headers });
  fetch(spotifyTokenEndpoint, opts)
    .then(res => res.json())
    .then(sendToPlaygroundWithCookie({ res, req }))
    .catch(err => send(res, 500, err));
};

export default handler;
