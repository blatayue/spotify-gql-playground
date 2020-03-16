import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/me/player/currently-playing
export const CurrentlyPlayingObject = gql`
  type CurrentlyPlayingObject {
    context: ContextObject
    timestamp: Float
    progress_ms: Int
    is_playing: Boolean
    item: TrackObject
    currently_playing_type: String # Can be one of track, episode, ad or unknown.
  }
`;
