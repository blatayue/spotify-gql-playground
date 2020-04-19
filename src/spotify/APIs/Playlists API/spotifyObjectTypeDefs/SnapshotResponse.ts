import { gql } from "apollo-server-micro";

export const snapshotResponse = gql`
  type SnapshotResponse {
    snapshot_id: String
  }
`;
