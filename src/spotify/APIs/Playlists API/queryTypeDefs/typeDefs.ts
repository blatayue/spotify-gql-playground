import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getUserPlaylists(user_id: String, limit: Int, offset: Int): PagingObject # UserPlaylistObject
  }

  extend type Mutation {
    addItemsToPlaylist(
      playlist_id: String
      items: [String]
      position: Int
    ): SnapshotResponse
    replacePlaylistItems(playlist_id: String, items: [String]): SnapshotResponse
  }
`;
