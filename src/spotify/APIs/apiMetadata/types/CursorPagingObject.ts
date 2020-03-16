import { gql } from "apollo-server-micro";

// Get All Categories: the response body contains an object with a categories field, with an array of category objects (wrapped in a paging object) in JSON format.
// Get a Category's Playlists: the response body contains an array of simplified playlist objects (wrapped in a paging object) in JSON format.
// Get All New Releases: The albums object contains an array of simplified album objects (wrapped in a paging object) in JSON format.
// TODO: Get All Featured Playlists: The playlists object contains an array of simplified playlist objects (wrapped in a paging object) in JSON format.
// Playlists tracks:  the response body contains an array of playlist track objects (wrapped in a paging object) in JSON format
// Current User's Playlists: the response body contains an array of simplified playlist objects (wrapped in a paging object) in JSON format.
// List of a User's Playlists:  the response body contains an array of simplified playlist objects (wrapped in a paging object)
// Get User's Saved Tracks: the response body contains an array of saved track objects (wrapped in a paging object) in JSON format.
// Get User's Saved Albums: the response body contains an array of album objects (wrapped in a paging object) in JSON format.
// Get Current User's Recently Played Tracks:  the response body contains an array of play history objects (wrapped in a cursor-based paging object) in JSON format. 
// Get Current User's Followed Artists: the response body contains an artists object. The artists object in turn contains a cursor-based paging object of Artists.
// Get a User's Top Artists and Tracks: the response body contains a paging object of Artists or Tracks
// Get an Artist's Albums:  the response body contains an array of simplified album objects (wrapped in a paging object) in JSON format.
// Search API: The response body contains an array of artist objects, simplified album objects, and/or track objects wrapped in a paging object in JSON.
// Unions:
// array of category objects : [CategoryObject]
// array of simplified playlist objects : [PlaylistObject]
// array of playlist track objects [PlaylistTrackObject]
// array of saved track objects [TrackObject]
// array of album objects [AlbumObject]
// array of play history objects [PlayHistoryObject]
// array object of Artists objects [ArtistObject]
// array of Artists or Tracks [ArtistObject | TrackObject]
// array of simplified album objects [SimplifiedAlbumObject]
// array of artist objects, simplified album objects, and/or track objects - search, type partitioned in query 

export const CursorPagingObject = gql`
  type CursorPagingObject {
    href: String
    items: [PagingItems]
    limit: Int
    next: String
    cursors: CursorObject
    total: Int
  }
`;
