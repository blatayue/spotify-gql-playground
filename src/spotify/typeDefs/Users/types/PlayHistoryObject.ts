import { gql } from "apollo-server-micro";

export const PlayHistoryObject = gql`
  type PlayHistoryObject {
    track: SimplifiedTrackObject
    played_at: String # Timestamp - ISO 8601 format
    context: ContextObject
  }
`;
