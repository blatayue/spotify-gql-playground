import AlbumQueryTypeDefs, {
  AlbumObject,
  CopyrightObject,
  SimplifiedAlbumObject
} from "./APIs/Albums API";

import { ArtistObject, SimplifiedArtistObject } from "./APIs/Artists API";

import {
  RecommendationSeedObject,
  RecommendationsResponseObject,
  CategoryObject
} from "./APIs/Browse API";

import {
  ContextObject,
  CursorObject,
  CursorPagingObject,
  ExternalIdObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject,
  PagingObject
} from "./APIs/Common Metadata API";

import { SavedAlbumObject } from "./APIs/Library API";

import PlayerQueryTypeDefs, {
  CurrentlyPlayingObject,
  DeviceObject,
  DevicesObject,
  PlayHistoryObject
} from "./APIs/Player API";

import PlaylistQueryTypeDefs, {
  PlaylistObject,
  PlaylistTrackObject
} from "./APIs/Playlists API";

import {
  AudioFeaturesObject,
  SimplifiedTrackObject,
  TrackObject,
  TuneableTrackObject
} from "./APIs/Tracks API";

import { PrivateUserObject, PublicUserObject } from "./APIs/User Profile API";

export default [
  //Albums
  ...[AlbumObject, CopyrightObject, SimplifiedAlbumObject],
  // Artist
  ...[ArtistObject, SimplifiedArtistObject],
  // Browse
  ...[RecommendationSeedObject, RecommendationsResponseObject, CategoryObject],
  // Common Meta
  ...[
    ContextObject,
    CursorObject,
    CursorPagingObject,
    ExternalIdObject,
    ExternalUrlObject,
    FollowersObject,
    ImageObject,
    PagingObject
  ],
  // Library
  ...[SavedAlbumObject],
  // Player
  ...[CurrentlyPlayingObject, DeviceObject, DevicesObject, PlayHistoryObject],
  // Playlist
  ...[PlaylistObject, PlaylistTrackObject],
  // Tracks
  ...[
    AudioFeaturesObject,
    SimplifiedTrackObject,
    TrackObject,
    TuneableTrackObject
  ],
  // User
  ...[PrivateUserObject, PublicUserObject],
  // Queries and Mutations
  ...[AlbumQueryTypeDefs, PlayerQueryTypeDefs, PlaylistQueryTypeDefs]
];
