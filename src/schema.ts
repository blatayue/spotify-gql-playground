import { gql, makeExecutableSchema } from "apollo-server-micro";
import SpotifyWebApi from "spotify-web-api-node";
import { playlistIdsToCamelot } from "./spotifyUtils";

const resolvers = {
  Query: {
    getAuthLink: async (parent, args, context: { spotify: SpotifyWebApi }) =>
      process.env.auth_link,
    getCamelotFromPlaylists: async (
      parent,
      args,
      context: { spotify: SpotifyWebApi }
    ) => playlistIdsToCamelot({ spotify: context.spotify, playlists: args.ids }),
    getCamelotFromPlaylist: async (
      parent,
      args,
      context: { spotify: SpotifyWebApi }
    ) => playlistIdsToCamelot({ spotify: context.spotify, playlists: [args.id] }).then(camelot => camelot[0])
  }
};

const typeDefs = gql`
  type Query {
    getAuthLink: String
    getCamelotFromPlaylist (id: String): [camelotObj]
    getCamelotFromPlaylists (ids: [String]): [[camelotObj]]
  }
  type camelotObj {
    title: String
    name: String
    key: String
    mode: String
  }
  type schema {
    query: Query
  }
`;
export const schema = makeExecutableSchema({ typeDefs, resolvers });
