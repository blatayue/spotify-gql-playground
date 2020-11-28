import types from './src/spotify'

// [CategoryObject] | [PlaylistObject] | [TrackObject] | [AlbumObject] | [PlayHistoryObject] | [ArtistObject] [ArtistObject | TrackObject] | [SimplifiedAlbumObject]

// type CategoryObject {
//     href: String
//     icons: [ImageObject]
//     id: String
//     name: String
//   }

// type PlaylistObject {
//     collaborative: Boolean
//     external_urls: ExternalUrlObject
//     href: String
//     id: String
//     images: [ImageObject]
//     name: String
//     owner: PublicUserObject
//     public: Boolean
//     snapshot_id: String
//     tracks: [TrackObject]
//     type: String # playlist
//     uri: String
//   }

// type TrackObject {
//     album: SimplifiedAlbumObject
//     artists: [ArtistObject]
//     available_markets: [String]
//     disc_number: Int
//     duration_ms: Int
//     explicit: Boolean
//     external_ids: ExternalIdObject
//     external_urls: ExternalUrlObject
//     href: String
//     id: String
//     is_playable: Boolean
//     linked_from: linked_from_object
//     restrictions: [TrackRestrictionObject]
//     name: String
//     popularity: Int
//     preview_url: String
//     track_number: Int
//     type: String # track
//     uri: String
//   }


//type Album {
//     album_type: album_type
//     artists: [ArtistObject]
//     available_markets: [String]
//     copyrights: [CopyrightObject]
//     external_urls: ExternalUrlObject
//     genres: [String]
//     href: String
//     id: String
//     images: [ImageObject]
//     label: String
//     name: String
//     popularity: Int # 0-100
//     release_date: String
//     release_date_precision: release_date_precision
//     tracks: [SimplifiedTrackObject]
//     type: String # album
//     uri: String # spotify:album:id
//   }

// type PlayHistoryObject {
//     track: SimplifiedTrackObject
//     played_at: String # Timestamp - ISO 8601 format
//     context: ContextObject
//   }

// type ArtistObject {
//     external_urls: ExternalUrlObject
//     followers: FollowersObject
//     genres: [String]
//     href: String
//     id: String
//     images: [ImageObject]
//     name: String
//     popularity: Int # 0-100
//     type: String # artist
//     uri: String # spotify:artist:id
//   }

types.astNode //?
