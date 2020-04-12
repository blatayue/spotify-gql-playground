import { gql, makeExecutableSchema } from "apollo-server-micro";
import SpotifyWebApi from "spotify-web-api-node";
import { playlistIdsToCamelot } from "./spotifyUtils";

import { addTracksToPlaylist } from "./spotify/APIs/Playlists API";

import { AlbumResolvers } from "./spotify/APIs/Albums API";
import { BrowseResolvers } from "./spotify/APIs/Browse API";
import { PlayerResolvers } from "./spotify/APIs/Player API";
import { TrackResolvers } from "./spotify/APIs/Tracks API";

type spotifyCtx = { spotify: SpotifyWebApi };
import typeThings from "./spotify";
import { stringify } from "qs";
import { allScopesStr } from "./authRedirect";

const authLinkQS = stringify(
  {
    response_type: "code",
    client_id: "be1ce429ce1e4c5182dfd81abc83ff0e",
    scope: allScopesStr,
    redirect_uri: "http://localhost:3000/callback/",
  },
  { arrayFormat: "comma", addQueryPrefix: true }
);

const resolvers = {
  Query: {
    getAuthLink: async (_, __, context: spotifyCtx) =>
      `https://accounts.spotify.com/authorize${authLinkQS}`,
    getCamelotFromPlaylists: async (_, args, context: spotifyCtx) =>
      playlistIdsToCamelot({ spotify: context.spotify, playlists: args.ids }),
    getCamelotFromPlaylist: async (_, args, context: spotifyCtx) =>
      playlistIdsToCamelot({
        spotify: context.spotify,
        playlists: [args.id],
      }).then((camelot) => camelot[0]),
    getAccessToken: async (_, __, context: spotifyCtx) =>
      context.spotify.getAccessToken(),
    addTracksToPlaylist,
    ...AlbumResolvers,
    ...PlayerResolvers,
    ...BrowseResolvers,
    ...TrackResolvers
  },
  PagingItems: {
    __resolveType: (obj, ctx, info) => {
      if (obj.played_at) return "PlayHistoryObject";
      if (obj.icons) return "CategoryObject";
      switch (obj.type) {
        case "track": {
          return "SimplifiedTrackObject";
        }
        case "album": {
          return "SimplifiedAlbumObject";
        }
        case "playlist": {
          return "PlaylistObject";
        }
      }
    },
  },
};

const typeDefs = gql`
  type Query {
    getAuthLink: String
    getCamelotFromPlaylist(id: String): [camelotObj]
    getCamelotFromPlaylists(ids: [String]): [[camelotObj]]
    getAccessToken: String
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
export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, ...typeThings],
  resolvers,
});
