import { gql } from "apollo-server-micro";

export const RecommendationSeedObject = gql`
  type RecommendationSeedObject {
    # The number of tracks available after min_* and max_* filters have been applied.
    afterFilteringSize: Int
    #The number of tracks available after relinking for regional availability.
    afterRelinkingSize: Int
    # A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be null.
    href: String
    # will be the same as the string used in the seed_artists, seed_tracks or seed_genres parameter
    id: String
    initialPoolSize: Int
    type: String # artist, track or genre
  }
`;
