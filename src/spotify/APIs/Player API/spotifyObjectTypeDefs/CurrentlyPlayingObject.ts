import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/me/player/currently-playing
export const CurrentlyPlayingObject = gql`
  type actions {
    disallows: disallows
  }
  type disallows {
    resuming: Boolean
    pausing: Boolean
  }
  type CurrentlyPlaying {
    context: ContextObject
    timestamp: Float
    progress_ms: Int
    item: TrackObject
    actions: actions
    currently_playing_type: String # Can be one of track, episode, ad or unknown.
    is_playing: Boolean
  }
`;
