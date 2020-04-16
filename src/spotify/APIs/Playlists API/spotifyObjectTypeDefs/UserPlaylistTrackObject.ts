import { gql } from "apollo-server-micro";

export const UserPlaylistTrackObject = gql`
  type UserPlaylistTrackObject {
    href: String
    total: Int
  }
`;
