import { gql } from "apollo-server-micro";

// Calls that return multiple objects are returned with this wrapper
// GET https://api.spotify.com/v1/albums?ids=

// GET https://api.spotify.com/v1/artists?ids=
// GET https://api.spotify.com/v1/artists/{id}/related-artists

// GET https://api.spotify.com/v1/browse/categories - NOT IMPLEMENTED YET

// GET https://api.spotify.com/v1/me/albums
// GET https://api.spotify.com/v1/me/playlists
// GET https://api.spotify.com/v1/me/top/{type}
// GET https://api.spotify.com/v1/me/tracks

// GET https://api.spotify.com/v1/playlists/{playlist_id}/images
// GET https://api.spotify.com/v1/playlists/{playlist_id}/tracks

// GET https://api.spotify.com/v1/search?q=

// GET https://api.spotify.com/v1/audio-features
// GET https://api.spotify.com/v1/tracks

export const PagingObject = gql`
  type PagingObject {
    href: String
    items: [CategoryObject] | [PlaylistObject] | [TrackObject] | [AlbumObject] | [PlayHistoryObject] | [ArtistObject] [ArtistObject | TrackObject] | [SimplifiedAlbumObject]
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
  }
`;
