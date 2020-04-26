import { getMultipleArtistsGQL } from "./queries/getMultipleArtists";
import { getArtistGQL } from "./queries/getArtist";
export const ArtistQueryTypeDefs = [getMultipleArtistsGQL, getArtistGQL];
