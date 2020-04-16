import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    addTracksToPlaylist(
      tracks: [String]
      playlist_id: String
      position: Int
    ): addTracksToPlaylistRes
    getUserPlaylists(user_id: String, limit: Int, offset: Int): PagingObject
    # UserPlaylistObject
  }
`;
