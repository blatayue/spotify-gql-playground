import { gql } from "apollo-server-micro";

export const ExternalIdObject = gql`
  type ExternalIdObject {
    ean: String
    isrc: String
    upc: String
  }
`;
