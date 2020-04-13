import { gql } from "apollo-server-micro";

export const RecommendationInput = gql`
  input Paging {
    country: String
    locale: String
    limit: Int
    offset: Int
  }

  input Seeds {
    artists: [String]
    tracks: [String]
    genres: [Genre]
  }

  input Tuneables {
    acousticness: Float
    danceability: Float
    energy: Float
    instrumentalness: Float
    liveness: Float
    loudness: Float
    speechiness: Float
    tempo: Float
  }
`;
