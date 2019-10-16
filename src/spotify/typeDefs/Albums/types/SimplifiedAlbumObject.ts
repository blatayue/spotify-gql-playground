import { gql } from "apollo-server-micro";

export const SimplifiedAlbumObject = gql`
  type SimplifiedAlbumObject {
    album_group: String
    album_type: String # album, single, or compilation
    artists: [SimplifiedArtistObject]
    available_markets: [String]
    external_urls: ExternalUrlObject
    href: String
    id: String
    images: [ImageObject] 
    name: String
    type: String # album
    uri: String
  }
`;
