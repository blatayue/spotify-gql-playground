import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAudioFeatures(id: String): AudioFeaturesObject
    getAudioFeaturesSeveralTracks(ids: [String]): SeveralAudioFeaturesTracks
    getAudioAnalysis(id: String): AudioAnalysisObject
    getTrack(id: String, market: String): TrackObject
  }
  type SeveralAudioFeaturesTracks {
    audio_features: [AudioFeaturesObject]
  }
`;
