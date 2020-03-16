import AlbumQueryTypeDefs, {
  AlbumObject,
  CopyrightObject,
  SimplifiedAlbumObject
} from "./APIs/Albums API";

import { ArtistObject, SimplifiedArtistObject } from "./typeDefs/Artists";

import { AudioFeaturesObject, TuneableTrackObject } from "./typeDefs/Echonest";

import { PlaylistObject, PlaylistTrackObject } from "./APIs/Playlists API";

import {
  RecommendationSeedObject,
  RecommendationsResponseObject
} from "./typeDefs/Reccomendations";

import {
  ExternalIdObject,
  SimplifiedTrackObject,
  TrackObject
} from "./typeDefs/Tracks";

import {
  PrivateUserObject,
  PublicUserObject,
  SavedAlbumObject
} from "./APIs/User Profile API";
import PlayerQueryTypeDefs, {
  CurrentlyPlayingObject,
  PlayHistoryObject,
  DeviceObject,
  DevicesObject
} from "./APIs/Player API";

import {
  ContextObject,
  CursorObject,
  CursorPagingObject,
  PagingObject
} from "./APIs/apiMetadata";

import {
  CategoryObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject
} from "./typeDefs/commonMetadata";

export default [
  AlbumQueryTypeDefs,
  AlbumObject,
  ArtistObject,
  AudioFeaturesObject,
  CategoryObject,
  ContextObject,
  CopyrightObject,
  CurrentlyPlayingObject,
  CursorObject,
  CursorPagingObject,
  DeviceObject,
  DevicesObject,
  ExternalIdObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject,
  PagingObject,
  PlayHistoryObject,
  PlayerQueryTypeDefs,
  PlaylistObject,
  PlaylistTrackObject,
  PrivateUserObject,
  PublicUserObject,
  RecommendationSeedObject,
  RecommendationsResponseObject,
  SavedAlbumObject,
  SimplifiedAlbumObject,
  SimplifiedArtistObject,
  SimplifiedTrackObject,
  TrackObject,
  TuneableTrackObject
];
