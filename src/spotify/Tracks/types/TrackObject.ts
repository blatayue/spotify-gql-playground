import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/tracks/{id}
export const TrackObject = gql`
  type TrackRestrictionObject {
    restrictions: Object # TODO - Figure out reasons available to use as keys w/ val String Country Code
  }
  type TrackObject {
    album: SimplifiedAlbumObject
    artists: [ArtistObject]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    external_ids: ExternalIdObject
    external_urls: Object # ExternalUrlObject - TODO - type this object - spotify API missing type
    href: String
    id: String
    is_playable: Boolean
    linked_from: TrackObject
    restrictions: [TrackRestrictionObject]
    name: String
    popularity: Int
    preview_url: String
    track_number: Int
    type: String # track
    uri: String
  }
`;
