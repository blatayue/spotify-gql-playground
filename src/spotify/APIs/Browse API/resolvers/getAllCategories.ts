import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-categories
Get All Categories
Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

QUERY PARAMETERS:
country: A country: an ISO 3166-1 alpha-2 country code. 
    Provide this parameter if you want to narrow the list of returned categories 
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
    a list of categories relevant to Sweden but as German language strings. String - Optional
limit: The maximum number of categories to return. 
    Default: 20. Minimum: 1. Maximum: 50. Integer - Optional
offset: The index of the first item to return. 
    Default: 0 (the first object). Use with limit to get the next set of categories.

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains an object with a categories field, 
    with an array of category objects (wrapped in a paging object) in JSON format. 
    
    On error, the header status code is an error code and the response body contains an error object.

    Once you have retrieved the list, you can use Get a Category to drill down further.
*/

type getAllCategories = (
  parent: any, // query root
  args: {
    country?: string;
    locale?: string;
    limit?: string;
    offset?: string;
  },
  context: any
) => Promise<object>;

export const getAllCategories: getAllCategories = async (
  parent,
  { country, locale, limit, offset },
  context
) => {
  const qstring = qs.stringify(
    { country, locale, limit, offset },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/browse/categories${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
