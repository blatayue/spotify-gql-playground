import { gql } from "apollo-server-micro";

export const CursorObject = gql`
    type CursorObject {
        after: String
    }
`;
