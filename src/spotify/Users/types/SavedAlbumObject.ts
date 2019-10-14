import { gql } from "apollo-server-micro";

export const SavedAlbumObject = gql`
  type SavedAlbumObject {
    added_at: String # Timestamp - ISO 8601 format as UTC with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise an additional field indicates the precision
    track: TrackObject
  }
`;
