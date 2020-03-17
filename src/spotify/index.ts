import AlbumQueryTypeDefs, {
  AlbumObject,
  CopyrightObject,
  SimplifiedAlbumObject
} from "./APIs/Albums API";

import { ArtistObject, SimplifiedArtistObject } from "./typeDefs/Artists";

import { AudioFeaturesObject, TuneableTrackObject } from "./typeDefs/Echonest";

import PlaylistQueryTypeDefs, {
  PlaylistObject,
  PlaylistTrackObject
} from "./APIs/Playlists API";

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
  ...[AlbumObject, CopyrightObject, SimplifiedAlbumObject],
  ...[ContextObject, CursorObject, CursorPagingObject, PagingObject],
  ...[ArtistObject, SimplifiedArtistObject],
  ...[AudioFeaturesObject, TuneableTrackObject],
  ...[CategoryObject, ExternalUrlObject, FollowersObject, ImageObject],
  ...[CurrentlyPlayingObject, DeviceObject, DevicesObject, PlayHistoryObject],
  ...[PlaylistObject, PlaylistTrackObject],
  ...[PrivateUserObject, PublicUserObject, SavedAlbumObject],
  ...[RecommendationSeedObject, RecommendationsResponseObject],
  ...[ExternalIdObject, SimplifiedTrackObject, TrackObject],
  ...[AlbumQueryTypeDefs, PlaylistQueryTypeDefs, PlayerQueryTypeDefs]
];
