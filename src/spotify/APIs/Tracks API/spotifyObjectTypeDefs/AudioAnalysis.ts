import { gql } from "apollo-server-micro";

export const AudioAnalysisObject = gql`
  type AudioAnalysisObject {
    bars: [Bar]
    beats: [Beat]
    meta: Meta
    sections: [Section]
    segments: [Segment]
    tatums: [Tatum]
    track: AnalysisTrack
  }

  type Bar {
    start: Float
    duration: Float
    confidence: Float
  }

  type Beat {
    start: Float
    duration: Float
    confidence: Float
  }
  type Meta {
    analyzer_version: String
    platform: String
    detailed_status: String
    status_code: Int
    timestamp: Float
    analysis_time: Float
    input_process: String
  }
  type Section {
    start: Float
    duration: Float
    confidence: Float
    loudness: Float
    tempo: Float
    tempo_confidence: Float
    key: Int
    key_confidence: Float
    mode: Int
    mode_confidence: Float
    time_signature: Int
    time_signature_confidence: Float
  }

  type Segment {
    start: Float
    duration: Float
    confidence: Float
    loudness_start: Float
    loudness_max_time: Float
    loudness_max: Float
    loudness_end: Float
    pitches: [Float]
    timbre: [Float]
  }

  type Tatum {
    start: Float
    duration: Float
    confidence: Float
  }

  type AnalysisTrack {
    duration: Float
    sample_md5: String
    offset_seconds: Float
    window_seconds: Float
    analysis_sample_rate: Int
    analysis_channels: Int
    end_of_fade_in: Float
    start_of_fade_out: Float
    loudness: Float
    tempo: Float
    tempo_confidence: Float
    time_signature: Int
    time_signature_confidence: Int
    key: Int
    key_confidence: Float
    mode: Int
    mode_confidence: Float
    codestring: String
    code_version: String
    echoprintstring: String
    echoprint_version: String
    synchstring: String
    synch_version: String
    rhythmstring: String
    rhythm_version: String
  }
`;
