import { ApolloServer } from "apollo-server-micro";
import { spotifyContext } from "./spotifyContext";
import { schema } from "./schema";

const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "request.credentials": "include"
    }
  },
  introspection: true,
  context: spotifyContext
});

export const graphqlServer = apolloServer.createHandler();
export default graphqlServer;
