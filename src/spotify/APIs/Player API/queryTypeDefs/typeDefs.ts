import { gql } from "apollo-server-micro";

export default gql`
  enum state {
    track
    context
    off
  }
  input offset {
    position: Int
    uri: String
  }
  extend type Query {
    getCurrentlyPlaying(market: String): CurrentlyPlaying
    getCurrentPlayback(market: String): CurrentPlayback
    setPlaybackRepeat(device_id: String, state: state): Boolean
    skipPlaybackNext(device_id: String): Boolean
    skipPlaybackPrevious(device_id: String): Boolean
    setPlaybackPause(device_id: String): Boolean
    setPlaybackStartResume(
      device_id: String
      context_uri: String
      uris: [String]
      position_ms: Int
      offset: offset
    ): Boolean
  }
`;
