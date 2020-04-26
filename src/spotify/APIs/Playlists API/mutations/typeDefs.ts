import { addItemsToPlaylistGQL } from "./addItemsToPlaylist";
import { replacePlaylistItemsGQL } from "./replacePlaylistItems";
import { reorderPlaylistItemsGQL } from "./reorderPlaylistItems";
import { changePlaylistDetailsGQL } from "./changePlaylistDetails";
import { uploadCustomPlaylistCoverGQL } from "./uploadCustomPlaylistCover";
import { removeItemsFromPlaylistGQL } from "./removeItemsFromPlaylist";
import { createPlaylistGQL } from "./createPlaylist";
export const playlistMutationTypeDefs = [
  addItemsToPlaylistGQL,
  replacePlaylistItemsGQL,
  reorderPlaylistItemsGQL,
  changePlaylistDetailsGQL,
  uploadCustomPlaylistCoverGQL,
  removeItemsFromPlaylistGQL,
  createPlaylistGQL,
];
