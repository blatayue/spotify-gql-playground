import { gql } from "apollo-server-micro";

export const FollowersObject = gql`
  type FollowersObject {
    href: String
    total: Int
  }
`;
