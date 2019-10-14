import { gql } from "apollo-server-micro";

export const ContextObject = gql`
  type ContextObject {
    type: String
    href: String
    external_urls: ExternalUrlObject
    uri: String
  }
`;
