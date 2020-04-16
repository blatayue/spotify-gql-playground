import fetch from "node-fetch";
import qs from "qs";
import { UserInputError } from "apollo-server-micro";
/*
https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-categories
Get a Category
Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).

HEADER:
Authorization: A valid user access token or your client credentials.	String	Required

PATH PARAMETER:
category_id: The Spotify category ID for the category.

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

Response: On success, the HTTP status code in the response header is 200 OK 
    and the response body contains a category object in JSON format. 
    
    On error, the header status code is an error code and the response body contains an error object.

    Once you have retrieved the category, you can use Get a Category’s Playlists to drill down further.
*/

type getCategory = (
  parent: any, // query root
  args: {
    category_id: string;
    country?: string;
    locale?: string;
  },
  context: any
) => Promise<object>;

export const getCategory: getCategory = async (
  parent,
  { category_id, country, locale },
  context
) => {
  const qstring = qs.stringify(
    { country, locale },
    { arrayFormat: "comma", addQueryPrefix: true }
  );

  const resp = await fetch(
    `https://api.spotify.com/v1/browse/categories/${category_id}${qstring}`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` }
    }
  );
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);

  return await resp.json();
};
