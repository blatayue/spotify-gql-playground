import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getUserPlaylists(user_id: String!, limit: Int, offset: Int): PagingObject # UserPlaylistObject
    getCurrentUserPlaylists(limit: Int, offset: Int): PagingObject # UserPlaylistObject
    getPlaylistCoverImage(playlist_id: String!): [ImageObject]
    getPlaylistItems(
      playlist_id: String!
      market: String
      limit: String
      offset: Int
    ): PagingObject # PlaylistTrackObject
    getPlaylist(playlist_id: String!, market: String): PlaylistObject
  }

  extend type Mutation {
    addItemsToPlaylist(
      playlist_id: String!
      items: [String]!
      position: Int
    ): SnapshotResponse
    replacePlaylistItems(
      playlist_id: String!
      items: [String]!
    ): SnapshotResponse
    reorderPlaylistItems(
      playlist_id: String!
      insert_before: Int!
      range_start: Int!
      range_length: Int
      snapshot_id: String
    ): SnapshotResponse
    changePlaylistDetails(
      playlist_id: String!
      name: String
      public: Boolean
      collaborative: Boolean
      description: String
    ): Boolean

    uploadCustomPlaylistCover(
      playlist_id: String!
      image: String
      image_url: String
    ): Boolean
    removeItemsFromPlaylist(
      playlist_id: String!
      uris: [String]!
      snapshot_id: String
    ): SnapshotResponse

    createPlaylist(
      user_id: String!
      name: String
      public: Boolean
      collaborative: Boolean
      description: String
    ): PlaylistObject
  }
`;
