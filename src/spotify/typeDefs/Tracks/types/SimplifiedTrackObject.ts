import { gql } from "apollo-server-micro";

export const SimplifiedTrackObject = gql`
  type SimplifiedTrackObject {
    artists: [SimplifiedArtistObject]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    external_urls: ExternalUrlObject
    href: String
    id: String
    is_playable: Boolean
    linked_from: TrackObject
    name: String
    preview_url: String
    track_number: Int
    type: String # track
    uri: String
  }
`;
