import { gql } from "apollo-server-micro";

export const CursorPagingObject = gql`
  type CursorPagingObject {
    href: String
    items: Object # TODO: it actually is a type, but one of many different ones
    limit: Int
    next: String
    cursors: CursorObject
    total: Int
  }
`;
