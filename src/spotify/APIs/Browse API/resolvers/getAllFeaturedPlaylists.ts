import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-featured-playlists
Get All Featured Playlists
Get a list of Spotify featured playlists (shown, for example, on a Spotify player’s ‘Browse’ tab).

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
country: A country: an ISO 3166-1 alpha-2 country code. 
    Provide this parameter if you want to narrow the list of returned items 
    to those relevant to a particular country. 
    If omitted, the returned items will be globally relevant. String - Optional

locale: The desired language, consisting of an 
    ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, 
    joined by an underscore. For example: es_MX, 
    meaning “Spanish (Mexico)”. Provide this parameter 
    if you want the category metadata returned in a particular language. 
    Note that, if locale is not supplied, or if the specified language is not available, 
    all strings will be returned in the Spotify default language (American English). 
    The locale parameter, combined with the country parameter, may give odd results 
    if not carefully matched. For example country=SE&locale=de_DE will return 
    a list of playlists relevant to Sweden but as German language strings. String - Optional

timestamp: A timestamp in ISO 8601 format: yyyy-MM-ddTHH:mm:ss. 
    Use this parameter to specify the user’s local time to get results tailored 
    for that specific date and time in the day. If not provided, 
    the response defaults to the current UTC time. 
    Example: “2014-10-23T09:00:00” for a user whose local time is 9AM. 
    If there were no featured playlists (or there is no data) at the specified time, 
    the response will revert to the current UTC time.    

limit: The maximum number of categories to return. 
    The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.	
offset: The index of the first item to return. 
    Default: 0 (the first object). Use with limit to get the next set of items.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an array of 
    simplified playlist objects (wrapped in a paging object) in JSON format 
    
    On error, the header status code is an error code and the response body contains an error object.
*/

type getAllFeaturedPlaylists = (
  parent: any, // query root
  args: {
    country?: string;
    locale?: string;
    timestamp?: string;
    limit?: number;
    offset?: number;
  },
  context: any
) => Promise<object>;

export const getAllFeaturedPlaylists: getAllFeaturedPlaylists = async (
  parent,
  { country, locale, timestamp, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { country, locale, timestamp, limit, offset },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
