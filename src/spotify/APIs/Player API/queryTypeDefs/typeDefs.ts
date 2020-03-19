import { gql } from "apollo-server-micro";

export default gql`
  enum state {
    track
    context
    off
  }
  extend type Query {
    getCurrentlyPlaying(market: String): CurrentlyPlaying
    getCurrentPlayback(market: String): CurrentPlayback
    setPlaybackRepeat(device_id: String, state: state): Boolean
    skipPlaybackNext(device_id: String): Boolean
    skipPlaybackPrevious(device_id: String): Boolean
  }
`;
