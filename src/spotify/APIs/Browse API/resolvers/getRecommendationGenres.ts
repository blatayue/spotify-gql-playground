import refetch from "@hazelee/refetch";

/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-recommendation-genres
Get Recommendation Genres
Retrieve a list of available genres seed parameter values for recommendations.

Authorization: A valid user access token or your client credentials.	String	Required

Response: A successful request will return a 200 OK response code 
            with a json payload that contains the device objects (see below). 
            When no available devices are found, 
            the request will return a 200 OK response with an empty devices list.
*/

type getRecommendationGenres = (
  parent: any, // query root
  args: {},
  context: any
) => Promise<object>;

export const getRecommendationGenres: getRecommendationGenres = async (
  parent,
  {},
  context
) =>
  refetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  }).json();
