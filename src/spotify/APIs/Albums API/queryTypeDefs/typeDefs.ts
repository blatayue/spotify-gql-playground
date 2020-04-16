import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAlbum(id: String, market: String): Album
    getMultipleAlbums(ids: [String], market: String): getMultipleAlbumsRes
    getAlbumTracks(id: String, market: String, offset: Int, limit: Int): PagingObject
  }
  type getMultipleAlbumsRes {
    albums: [Album]
  }
`;
