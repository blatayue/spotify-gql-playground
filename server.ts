import fetch from "node-fetch";
import { sign } from "jsonwebtoken";

import { NowRequest, NowResponse } from "@now/node";
import querystring from "querystring";

// This serverless func handles the oauth2 access token flow
// It is called with my custom url from spotify and the corersponding redirect
// It handles the code exchange for an access token and refresh token
// It signs the token response as a jwt and sends it to the frontend playground
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
    // use Now headers to dynamically get the current url
    // and use that to determine env for redirect uri
    redirect_uri: `${headers["x-forwarded-proto"]}://${headers["x-forwarded-host"]}/callback/`,
    code
  })
});

const sendToPlaygroundWithToken = (
  req: NowRequest,
  res: NowResponse
) => spotifyResponse => {
  if (spotifyResponse.error) {
    // retry auth
    console.error(spotifyResponse.error);
    res.setHeader(
      "Location",
      // Could cause infinite ping-pong redirects. Maybe change - TODO
      `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/auth`
    );
    res.status(301).end();
  } else {
    // redirect to playground
    res.setHeader(
      "Location",
      // frontend graphql playground is static and stable
      `https://spotify-graphql-playground.blatayuze.now.sh?token=${sign(spotifyResponse, process.env.jwt_secret)}`
    );
    res.status(301).end();
  }
};

// TODO: tidy up somehow
const handler = (req: NowRequest, res: NowResponse) => {
  const opts = fetchOpts({ code: req.query.code, headers: req.headers });
  fetch(spotifyTokenEndpoint, opts)
    .then(async tokenRes => await tokenRes.json())
    .then(sendToPlaygroundWithToken(req, res))
    .catch(err => {
      res.status(500).send(err);
    });
};

export default handler;
