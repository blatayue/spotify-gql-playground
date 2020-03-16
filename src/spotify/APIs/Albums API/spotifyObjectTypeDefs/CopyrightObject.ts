import { gql } from "apollo-server-micro";

export const CopyrightObject = gql`
  type CopyrightObject {
    text: String
    type: String
  }
`;
