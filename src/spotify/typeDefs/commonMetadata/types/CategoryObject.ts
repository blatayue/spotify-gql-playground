import { gql } from "apollo-server-micro";

export const CategoryObject = gql`
  type CategoryObject {
    href: String
    icons: [ImageObject]
    id: String
    name: String
  }
`;
