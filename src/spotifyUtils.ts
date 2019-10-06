import SpotifyWebApi from "spotify-web-api-node";
import {keyAndModeToCamelot} from './camelot'
const getItems = res => res.body.items;

const mapIds = items => items.map(item => item.id);

interface playlistsAndSpotify {
    spotify: SpotifyWebApi;
    playlists: string[] 
}

// get the tracks for each (w/ map) playlist from the id
const getPlaylistTracks = async ({playlists, spotify}: playlistsAndSpotify) =>
  Promise.all(playlists.map(async id => await spotify.getPlaylistTracks(id)));

// transform song[] into playlist[{songs: id[], names: name[]}]
const mapIdAndNameFromPlaylist = playlists =>
  playlists.map(playlist => ({
    ids: playlist.map(song => song.id),
    names: playlist.map(song => song.name)
  }));

const getFeatures = (spotify: SpotifyWebApi) => async ({ ids, names }) =>
  await spotify
    .getAudioFeaturesForTracks(ids) // get the audio features for all songs
    .then(featureRes =>
      featureRes.body.audio_features.map((features, index) => ({
        keyNum: features.key,
        mode: features.mode,
        name: names[index]
      }))
    );
interface features {
  keyNum: number;
  mode: number;
  name: string;
}
// take each song, run mode and key through camelot convertor and recombine with name by index
const camelotFromKeyAndMode = ({ keyNum, mode, name }: features) => ({
  title: name,
  ...keyAndModeToCamelot({ key: keyNum, mode }),
  mode: mode ? "major" : "minor" // mode is major if 1, minor if 0, treat major as boolean true
});

export const playlistIdsToCamelot = ({spotify, playlists}) => getPlaylistTracks({spotify, playlists}) // get tracks for every playlist
  .then(playlists => playlists.map(getItems)) // get items from every tracks response for every playlist
  .then(playlists =>
    playlists.map(playlist => playlist.map(tracks => tracks.track))
  ) // drill props
  .then(mapIdAndNameFromPlaylist) // tramsform
  .then(playlists => Promise.all(playlists.map(getFeatures(spotify)))) // get Features for key/mode/whatever
  .then(playlists =>
    playlists.map((playlist: features[]) => playlist.map(camelotFromKeyAndMode)))
//   .then(output => pWriteFile('./4qr3VkZHVwiQJFoS75GqoC.json', JSON.stringify(output))) //?
