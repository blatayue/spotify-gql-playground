import { gql } from "apollo-server-micro";

export const PublicUserObject = gql`
  type PublicUserObject {
    display_name: String
    external_urls: ExternalUrlObject
    followers: FollowersObject
    href: String
    id: String
    images: [ImageObject]
    type: String # user
    uri: String
  }
`;
