import { gql } from "apollo-server-micro";

export const SimplifiedArtistObject = gql`
  type SimplifiedArtistObject {
    external_urls: [ExternalUrlObject]
    href: String
    id: String
    name: String
    type: String # artist,
    uri: String
  }
`;
