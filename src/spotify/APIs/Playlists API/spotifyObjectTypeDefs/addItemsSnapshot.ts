import { gql } from "apollo-server-micro";

export const addItemSnaphot = gql`
  type addItemsToPlaylistRes {
    snapshot_id: String
  }
`;
