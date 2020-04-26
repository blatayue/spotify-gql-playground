import { getAudioAnalysisGQL } from "./getAudioAnalysis";
import { getAudioFeaturesGQL } from "./getAudioFeatures";
import { getAudioFeaturesSeveralTracksGQL } from "./getAudioFeaturesSeveralTracks";
import { getTrackGQL } from "./getTrack";
import { getTracksGQL } from "./getTracks";

export const TracksQueryTypeDefs = [
  getAudioAnalysisGQL,
  getAudioFeaturesGQL,
  getAudioFeaturesSeveralTracksGQL,
  getTrackGQL,
  getTracksGQL,
];
