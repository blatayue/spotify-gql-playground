// Exporting the entire spotify APIs object types and queries/mutation types into a single array
// Default imports are the queries/mutations, named exports are individual objects

import AlbumQueryTypeDefs, {
  AlbumObject,
  CopyrightObject,
  SimplifiedAlbumObject,
} from "./APIs/Albums API";

import { ArtistObject, SimplifiedArtistObject } from "./APIs/Artists API";

import BrowseQueryTypeDefs, {
  RecommendationSeedObject,
  RecommendationsResponseObject,
  CategoryObject,
  RecommendationInput,
  Genre,
} from "./APIs/Browse API";

import {
  ContextObject,
  CursorObject,
  CursorPagingObject,
  ExternalIdObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject,
  PagingObject,
} from "./APIs/Common Metadata API";

import { SavedAlbumObject } from "./APIs/Library API";

import PlayerQueryTypeDefs, {
  CurrentPlaybackObject,
  CurrentlyPlayingObject,
  DeviceObject,
  DevicesObject,
  PlayHistoryObject,
} from "./APIs/Player API";

import {
  playlistMutationTypeDefs,
  playlistQueryTypeDefs,
  PlaylistObject,
  PlaylistTrackObject,
  UserPlaylistObject,
  UserPlaylistTrackObject,
  snapshotResponse,
} from "./APIs/Playlists API";

import TracksQueryTypeDefs, {
  AudioFeaturesObject,
  SimplifiedTrackObject,
  TrackObject,
  TuneableTrackObject,
  AudioAnalysisObject,
} from "./APIs/Tracks API";

import { PrivateUserObject, PublicUserObject } from "./APIs/User Profile API";

export default [
  // Inputs and extended types first
  ...[RecommendationInput],
  //Albums
  ...[AlbumObject, CopyrightObject, SimplifiedAlbumObject],
  // Artist
  ...[ArtistObject, SimplifiedArtistObject],
  // Browse
  ...[
    RecommendationSeedObject,
    RecommendationsResponseObject,
    CategoryObject,
    Genre,
  ],
  // Common Meta
  ...[
    ContextObject,
    CursorObject,
    CursorPagingObject,
    ExternalIdObject,
    ExternalUrlObject,
    FollowersObject,
    ImageObject,
    PagingObject,
  ],
  // Library
  ...[SavedAlbumObject],
  // Player
  ...[
    CurrentPlaybackObject,
    CurrentlyPlayingObject,
    DeviceObject,
    DevicesObject,
    PlayHistoryObject,
  ],
  // Playlist
  ...[
    snapshotResponse,
    PlaylistObject,
    PlaylistTrackObject,
    UserPlaylistObject,
    UserPlaylistTrackObject,
  ],
  // Tracks
  ...[
    AudioAnalysisObject,
    AudioFeaturesObject,
    SimplifiedTrackObject,
    TrackObject,
    TuneableTrackObject,
  ],
  // User
  ...[PrivateUserObject, PublicUserObject],
  // Queries and Mutations
  ...[
    AlbumQueryTypeDefs,
    BrowseQueryTypeDefs,
    PlayerQueryTypeDefs,
    ...playlistQueryTypeDefs,
    ...playlistMutationTypeDefs,
    TracksQueryTypeDefs,
  ],
];
