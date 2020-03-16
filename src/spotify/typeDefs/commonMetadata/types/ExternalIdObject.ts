import { gql } from "apollo-server-micro";

export const ExternalIdObject = gql`
  type ExternalIdObject {
    upc: String
    ean: String
  }
`;
