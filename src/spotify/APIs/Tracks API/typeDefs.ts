import { getAudioAnalysisGQL } from "./queries/getAudioAnalysis";
import { getAudioFeaturesGQL } from "./queries/getAudioFeatures";
import { getAudioFeaturesSeveralTracksGQL } from "./queries/getAudioFeaturesSeveralTracks";
import { getTrackGQL } from "./queries/getTrack";
import { getTracksGQL } from "./queries/getTracks";

export const TracksQueryTypeDefs = [
  getAudioAnalysisGQL,
  getAudioFeaturesGQL,
  getAudioFeaturesSeveralTracksGQL,
  getTrackGQL,
  getTracksGQL,
];
