# Spotify GraphQL Playground
## Implements a GraphQL playground for ease of development against the Spotify API

### Uses the OAuth Authorization Code flow and a auth token set with a micro redirect callback route to authorize api calls sent from the playground

## How to use - dev environment
- Clone the repo and install dependencies - `git clone` & `npm install`
- Install and authenticate with Zeit Now
- Use the Spotify Developer Portal to create an app to get your client id and secret
- Create a .env file with the following variables set
    - auth_link : the auth link to use for code exchange
        - you can set the redirect uri to http://localhost:3000/callback/ for a dev environment
        - be sure to encodeUriComponent the redirect uri
    - spotify_client_id : your client id
    - spotify_client_secret : your client secret
    - redirect_uri : just the unencoded redirect used for code exchange payload
    - auth_link : hardcoded entire code exchange link used to authorize the playground
        - is also returnded with the gql query getAuthLink
            - For now depends on the env var, but will be generated soon from the other env vars
    - jwt_secret : long, randomish string used to sign the jwt token that becomes the auth token
- run `npm start:dev`
- Follow your auth link/ code exchange url to start the authentication process and end up at the playground
- Final Step: Wait for me to implement more of the API as GQL compliant

## How to use - production
- Fork the repo
- Setup Zeit Now Github integration
- create a custom subdomain through the zeit dashboard so you have a static deploy url
- set the secrets as shown in the now.json config
    - `[npx] now secrets add [name without the @] "[value]"`
        - npx is optional if now is installed globally, is a dev dep, so can be installed to the local project too and kept out of path
- That's basically it. Either make a change and push it to have zeit build the commit or just run `now`
