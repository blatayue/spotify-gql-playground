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
const fetchOpts = ({code, req}) => ({
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer(
      `${process.env.spotify_client_id}:${process.env.spotify_client_secret}`
    ).toString("base64")}`
  },
  body: querystring.stringify({
    grant_type: "authorization_code",
    redirect_uri: `${req.headers['x-forwarded-proto']}://${req.headers["x-forwarded-host"]}/callback/`,
    code
  })
});

const formatSpotifyResponse = async body => ({
  token_response: await body.json(),
  status: body.status
});
const checkSpotifyResponse = ({ status, token_response }) => {
  console.log(status, token_response);
  return { token_response };
};

const prepCookie = ({ token_response }) => ({
  cookieString: cookie.serialize(
    "spotify_auth",
    sign(token_response, process.env.jwt_secret), // make jwt
    {
      expires: new Date("October 8, 2019 19:00:00"), // replace with moment date set for a few days
      path: "/" // Haven't tested if necessary
    }
  )
});
const sendToPlaygroundWithCookie =  ({req, res }) => ({ cookieString }) => {
  console.log(cookieString)
  res.setHeader("Set-Cookie", cookieString);
  res.setHeader("Location", `${req.headers['x-forwarded-proto']}://${req.headers["x-forwarded-host"]}/graphql`); // redirect to playground for now
  send(res, 301);
};

// TODO: Replace with Algebra
const handler: RequestHandler = async (req, res) => {
  console.log(req.headers)
  fetch(spotifyTokenEndpoint, fetchOpts({code: query(req).code, req})) // get access_token , refresh_token
    .then(formatSpotifyResponse) // make api res easier to work with
    .then(checkSpotifyResponse) // console log to verify everything's going smoothly
    .then(prepCookie) // serialize a cookie
    .then(sendToPlaygroundWithCookie({res, req})) // rather proud of that function name
    .catch(err => send(res, 500, err)); // It will inevitably fail, may as well know why. probably api abuse
};

export default handler;
