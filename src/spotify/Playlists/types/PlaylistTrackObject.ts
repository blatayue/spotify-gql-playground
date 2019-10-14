import { gql } from "apollo-server-micro";

export const PlaylistTrackObject = gql`
  type PlaylistTrackObject {
    added_at: String # Timestamp - ISO 8601 format
    added_by: PublicUserObject
    is_local: Boolean
    track: TrackObject
  }
`;
