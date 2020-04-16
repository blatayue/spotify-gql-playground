import { gql } from "apollo-server-micro";

export const ExternalUrlObject = gql`
  type ExternalUrlObject {
    spotify: String # I don't think spotify would link anywhere else, probably safe as only key, but we'll see
  }
`;
