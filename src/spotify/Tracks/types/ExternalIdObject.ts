import { gql } from "apollo-server-micro";



export const ExternalIdObject = gql`
    type ExternalIdObject {
        isrc: String
        ean: String
        upc: String
    }

`
