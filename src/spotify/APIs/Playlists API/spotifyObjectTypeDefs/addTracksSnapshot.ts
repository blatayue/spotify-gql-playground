import { gql } from "apollo-server-micro";

export const addTrackSnaphot = gql`
  type addTracksToPlaylistRes {
    snapshot_id: String
  }
`;
