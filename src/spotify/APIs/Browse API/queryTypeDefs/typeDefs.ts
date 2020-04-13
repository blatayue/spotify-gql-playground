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
    getNewReleases(
      category_id: String
      country: String
      limit: Int
      offset: Int
    ): AlbumtPagingResponse

    getRecommendationGenres: RecommendationGenres

    getAllFeaturedPlaylists(
      country: String
      locale: String
      timestamp: String
      limit: Int
      offset: Int
    ): FeaturedPlaylists

    getRecommendations(
      paging: Paging
      seeds: Seeds
      max_tuneables: Tuneables
      min_tuneables: Tuneables
      target_tuneables: Tuneables
    ): RecommendationsResponseObject
  }

  type FeaturedPlaylists {
    message: String
    playlists: PagingObject
  }

  type RecommendationGenres {
    genres: [String]
  }
  type CategoryPagingResponse {
    categories: PagingObject
  }
  type PlaylistPagingResponse {
    playlists: PagingObject
  }
  type AlbumtPagingResponse {
    albums: PagingObject
  }
`;
