import { gql } from "apollo-server-micro";

export const AudioFeaturesObject = gql`
  type AudioFeaturesObject {
    acousticness: Float
    analysis_url: String
    danceability: Float
    duration_ms: Int
    energy: Float
    id: String
    instrumentalness: Float
    key: Int
    liveness: Float
    loudness: Float
    mode: Int
    speechiness: Float
    tempo: Float
    time_signature: Int
    track_href: String
    type: String # audio_features
    uri: String # for track - spotify:track:id
    valence: Float # 0-1
  }
`;
