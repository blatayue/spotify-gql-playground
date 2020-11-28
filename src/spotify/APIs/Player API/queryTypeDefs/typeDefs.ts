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
    getDevices: Devices
    getRecentlyPlayedTracks(
      type: String
      before: Float
      after: Float
      limit: Int
    ): CursorPagingObject
  }

  extend type Mutation {
    setPlaybackRepeat(device_id: String, state: state): Boolean
    skipPlaybackNext(device_id: String): Boolean
    skipPlaybackPrevious(device_id: String): Boolean
    setPlaybackPause(device_id: String): Boolean
    addToQueue(device_id: String, uri: String): Boolean
    setPlaybackStartResume(
      device_id: String
      context_uri: String
      uris: [String]
      position_ms: Float
      offset: offset
    ): Boolean
    seekPlayer(device_id: String, position_ms: Int, percent: Float): Boolean
    setVolume(device_id: String, volume_percent: Int): Boolean
    transferPlayback(device_ids: [String], play: Boolean): Boolean
  }
`;
