import { ApolloServer } from "apollo-server-micro";
import { spotifyContext } from "./spotifyContext";
import { schema } from "./schema";

const apolloServer = new ApolloServer({
  schema,
  tracing: true,
  introspection: true,
  context: spotifyContext,
});

export const graphqlServer = apolloServer.createHandler();
export default graphqlServer;
