import fetch from "node-fetch";
import qs from "qs";
import { UserInputError, gql } from "apollo-server-micro";
/*
[URL]
[Endpoint title]
[Endpoint Description]

HEADER:
Authorization: A valid user access token	String	Required

[PATH PARAMETER]:
[param]: [desc]

[QUERY PARAMETERS]:
[param]: [desc]

[Response]: [On success]
            [On error]
            
            [Note]

*/

export const queryGQL = gql`
  extend type Query {
    """

    """
  }
`;

type query = (
  parent: any, // query root
  args: {},
  context: any
) => Promise<object>;

export const query: query = async (parent, {}, context) => {
  const qstring = qs.stringify(
    {},
    { arrayFormat: "comma", addQueryPrefix: true }
  );
  const resp = await fetch(`ENDPOINT_URL${qstring}`, {
    method: "GET",
    headers: { authorization: `Bearer ${context.spotify.getAccessToken()}` },
  });
  if (resp.status != 200)
    throw new UserInputError((await resp.json()).error.message);
  return await resp.json();
};
