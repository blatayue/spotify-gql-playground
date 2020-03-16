import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/artists/{id}
export const ArtistObject = gql`
  type ArtistObject {
    external_urls: ExternalUrlObject
    followers: FollowersObject
    genres: [String]
    href: String
    id: String
    images: [ImageObject]
    name: String
    popularity: Int # 0-100
    type: String # artist
    uri: String # spotify:artist:id
  }
`;
