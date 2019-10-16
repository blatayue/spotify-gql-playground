import { gql } from "apollo-server-micro";

export const ImageObject = gql`
  type ImageObject {
    height: Int
    url: String
    width: Int
  }
`;
