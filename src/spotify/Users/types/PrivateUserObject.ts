import { gql } from "apollo-server-micro";

export const PrivateUserObject = gql`
  type PrivateUserObject {
    country: String # user-read-private scope
    display_name: String # nullable
    email: String # user-read-email scope
    external_urls: Object # ExternalUrlObject - TODO - type this object - spotify API missing type
    followers: FollowersObject
    href: String
    id: String
    images: [ImageObject]
    product: String # user-read-private scope - premium, free, open
    type: String # user
    uri: String
  }
`;
