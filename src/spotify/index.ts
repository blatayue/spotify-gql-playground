import { makeExecutableSchema } from "apollo-server-micro";

import { AlbumObject, CopyrightObject, SimplifiedAlbumObject } from "./typeDefs/Albums";
import { ArtistObject, SimplifiedArtistObject } from "./typeDefs/Artists";
import { AudioFeaturesObject, TuneableTrackObject } from "./typeDefs/Echonest";
import { PlaylistObject, PlaylistTrackObject } from "./typeDefs/Playlists";
import {
  RecommendationSeedObject,
  RecommendationsResponseObject
} from "./typeDefs/Reccomendations";
import { ExternalIdObject, SimplifiedTrackObject, TrackObject } from "./typeDefs/Tracks";
import {
  CurrentlyPlayingObject,
  DeviceObject,
  DevicesObject,
  PlayHistoryObject,
  PrivateUserObject,
  PublicUserObject,
  SavedAlbumObject
} from "./typeDefs/Users";
import {
  ContextObject,
  CursorObject,
  CursorPagingObject,
  PagingObject
} from "./typeDefs/apiMetadata";
import {
  CategoryObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject
} from "./typeDefs/commonMetadata";

export default makeExecutableSchema({
  typeDefs: [
    AlbumObject,
    ArtistObject,
    AudioFeaturesObject,
    CategoryObject,
    ContextObject,
    CopyrightObject,
    CurrentlyPlayingObject,
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
  ]
});
