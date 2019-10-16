import { gql } from "apollo-server-micro";

export const RecommendationsResponseObject = gql`
  type RecommendationsResponseObject {
    seeds: [RecommendationSeedObject]
    tracks: [SimplifiedTrackObject]
  }
`;
