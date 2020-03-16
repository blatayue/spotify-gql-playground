import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/albums/{id}
export const AlbumObject = gql`
  enum album_type {
    album
    single
    compilation
  }
  enum release_date_precision {
    year
    month
    day
  }

  type Album {
    album_type: album_type
    artists: [ArtistObject]
    available_markets: [String]
    copyrights: [CopyrightObject]
    external_ids: ExternalIdObject
    external_urls: ExternalUrlObject
    genres: [String]
    href: String
    id: String
    images: [ImageObject]
    label: String
    name: String
    popularity: Int # 0-100
    release_date: String
    release_date_precision: release_date_precision
    tracks: PagingObject
    type: String # album
    uri: String # spotify:album:id
  }
`;
