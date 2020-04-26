import { getUserPlaylistsGQL } from "./queries/getUserPlaylists";
import { getCurrentUserPlaylistsGQL } from "./queries/getCurrentUserPlaylists";
import { getPlaylistCoverImageGQL } from "./queries/getPlaylistCoverImage";
import { getPlaylistItemsGQL } from "./queries/getPlaylistItems";
import { getPlaylistGQL } from "./queries/getPlaylist";

export const playlistQueryTypeDefs = [
  getUserPlaylistsGQL,
  getCurrentUserPlaylistsGQL,
  getPlaylistCoverImageGQL,
  getPlaylistItemsGQL,
  getPlaylistGQL,
];

import { addItemsToPlaylistGQL } from "./mutations/addItemsToPlaylist";
import { replacePlaylistItemsGQL } from "./mutations/replacePlaylistItems";
import { reorderPlaylistItemsGQL } from "./mutations/reorderPlaylistItems";
import { changePlaylistDetailsGQL } from "./mutations/changePlaylistDetails";
import { uploadCustomPlaylistCoverGQL } from "./mutations/uploadCustomPlaylistCover";
import { removeItemsFromPlaylistGQL } from "./mutations/removeItemsFromPlaylist";
import { createPlaylistGQL } from "./mutations/createPlaylist";

export const playlistMutationTypeDefs = [
  addItemsToPlaylistGQL,
  replacePlaylistItemsGQL,
  reorderPlaylistItemsGQL,
  changePlaylistDetailsGQL,
  uploadCustomPlaylistCoverGQL,
  removeItemsFromPlaylistGQL,
  createPlaylistGQL,
];
