import { gql } from "apollo-server-micro";

// GET https://api.spotify.com/v1/audio-features/{id}
export const TuneableTrackObject = gql`
  type TuneableTrackObject {
    acousticness: Float
    danceability: Float
    duration_ms: Int
    energy: Float
    instrumentalness: Float
    key: Int
    liveness: Float
    loudness: Float # avg dB
    mode: Int # 0/1 minor/major
    popularity: Float
    speechiness: Float
    tempo: Float
    time_signature: Int
    valence: Float
  }
`;
