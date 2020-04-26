import { getUserPlaylistsGQL } from "./getUserPlaylists";
import { getCurrentUserPlaylistsGQL } from "./getCurrentUserPlaylists";
import { getPlaylistCoverImageGQL } from "./getPlaylistCoverImage";
import { getPlaylistItemsGQL } from "./getPlaylistItems";
import { getPlaylistGQL } from "./getPlaylist";
export const playlistQueryTypeDefs = [
  getUserPlaylistsGQL,
  getCurrentUserPlaylistsGQL,
  getPlaylistCoverImageGQL,
  getPlaylistItemsGQL,
  getPlaylistGQL,
];
