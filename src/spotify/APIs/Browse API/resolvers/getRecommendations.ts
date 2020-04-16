import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-recommendations
Get Recommendations
Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. 
If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.

For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
seed_artists: A comma separated list of Spotify IDs for seed artists. 
    Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.

seed_genres: A comma separated list of any genres in the set of available genre seeds. 
    Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.

seed_tracks: A comma separated list of Spotify IDs for a seed track. 
    Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.

limit: The target size of the list of recommended tracks. 
    For seeds with unusually small pools or when highly restrictive filtering is applied,
     it may be impossible to generate the requested number of recommended tracks. 
     Debugging information for such cases is available in the response. 
     Default: 20. Minimum: 1. Maximum: 100.

market: An ISO 3166-1 alpha-2 country code or the string from_token. 
Provide this parameter if you want to apply Track Relinking. 
Because min_*, max_* and target_* are applied to pools before relinking, 
the generated results may not precisely match the filters applied. 
Original, non-relinked tracks are available via the linked_from attribute of the relinked track response.

min_*: Multiple values.
     For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided.
      See tunable track attributes below for the list of available options. 
      For example, min_tempo=140 would restrict results to only those tracks with a tempo of greater than 140 beats per minute.

max_*: Multiple values. For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. 
    See tunable track attributes below for the list of available options. 
    For example, max_instrumentalness=0.35 would filter out most tracks that are likely to be instrumental.

target_*: Multiple values. For each of the tunable track attributes (below) a target value may be provided. 
    Tracks with the attribute values nearest to the target values will be preferred. 
    For example, you might request target_energy=0.6 and target_danceability=0.8. 
    All target values will be weighed equally in ranking results.

Tuneable Track Attributes List:
    acousticness: A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
    1.0 represents high confidence the track is acoustic.
    danceability: Danceability describes how suitable a track is for dancing based on a combination of musical elements 
            including tempo, rhythm stability, beat strength, and overall regularity.
            A value of 0.0 is least danceable and 1.0 is most danceable.
    energy: Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. 
            Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, 
            while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include 
            dynamic range, perceived loudness, timbre, onset rate, and general entropy.
    instrumentalness: Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context.
            Rap or spoken word tracks are clearly “vocal”. 
            The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. 
            Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
    liveness: 	Detects the presence of an audience in the recording. 
            Higher liveness values represent an increased probability that the track was performed live.
            A value above 0.8 provides strong likelihood that the track is live.
    loudness: The overall loudness of a track in decibels (dB). 
            Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. 
            Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). 
            Values typical range between -60 and 0 db.
    speechiness: Speechiness detects the presence of spoken words in a track. 
            The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. 
            Values above 0.66 describe tracks that are probably made entirely of spoken words. 
            Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered,
            including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
    tempo: The overall estimated tempo of a track in beats per minute (BPM). 
            In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains a recommendations response object in JSON format.
    
    On error, the header status code is an error code and the response body contains an error object.


*/

type tuneables = {
  acousticness?: number;
  danceability?: number;
  energy?: number;
  instrumentalness?: number;
  liveness?: number;
  loudness?: number;
  speechiness?: number;
  tempo?: number;
};

type seeds = {
  artists: string[];
  tracks: string[];
  genres: string[];
};

type paging = {
  country?: string;
  locale?: string;
  limit?: number;
  offset?: number;
};

// For the first time, it's not identical
// I don't know how I feel about it yet.
// TODO - review by 4/15/20
type recArgs = {
  paging: paging;
  seeds: seeds;
  max_tuneables: tuneables;
  min_tuneables: tuneables;
  target_tuneables: tuneables;
};

type getRecommendations = (
  parent: any, // query root
  args: recArgs,
  context: any
) => Promise<object>;

// use an array of the keys to reassign the names and spread into a new reduced object
const prefixKeys = (obj = {}, prefix: string) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({
      [`${prefix}_${key}`]: obj[key],
      ...newObj,
    }),
    {}
  );

export const getRecommendations: getRecommendations = async (
  parent,
  { max_tuneables, min_tuneables, target_tuneables, paging, seeds },
  context
) => {
  const qstring = qs.stringify(
    {
      ...paging,
      // dynamic key generation as they're just so repetetive
      ...prefixKeys(seeds, "seed"),
      ...prefixKeys(max_tuneables, "max"),
      ...prefixKeys(min_tuneables, "min"),
      ...prefixKeys(target_tuneables, "target"),
    },
    {
      arrayFormat: "comma",
      addQueryPrefix: true,
    }
  );
  console.log(`https://api.spotify.com/v1/recommendations${qstring}`);
  const resp = await fetch(
    `https://api.spotify.com/v1/recommendations${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
