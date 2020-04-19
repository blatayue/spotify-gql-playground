import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    addItemsToPlaylist(
      items: [String]
      playlist_id: String
      position: Int
    ): addItemsToPlaylistRes
    getUserPlaylists(user_id: String, limit: Int, offset: Int): PagingObject
    # UserPlaylistObject
  }
`;
