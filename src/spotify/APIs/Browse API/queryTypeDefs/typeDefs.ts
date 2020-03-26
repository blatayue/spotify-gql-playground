import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAllCategories(
      country: String
      locale: String
      limit: Int
      offset: Int
    ): CategoryPagingResponse
    getCategory(
      category_id: String
      country: String
      locale: String
    ): CategoryObject
    getCategoryPlaylists(
      category_id: String
      country: String
      limit: Int
      offset: Int
    ): PlaylistPagingResponse
  }

  type CategoryPagingResponse {
    categories: PagingObject
  }
  type PlaylistPagingResponse {
    playlists: PagingObject
  }
`;