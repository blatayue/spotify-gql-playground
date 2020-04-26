import fetch from "node-fetch";
import { UserInputError, ForbiddenError, gql } from "apollo-server-micro";
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

[JSON BODY PARAMETERS]:
[param]: [desc]

[Response]: [On success]
            [On error]
            
            [Note]

*/

export const mutationGQL = gql`
  extend type Mutation {
    """
    description
    """
    method(param: String!): Response
  }
`;

type mutation = (
  parent: any, // query root
  args: {},
  context: any
) => Promise<object>;

export const mutation: mutation = async (parent, {}, context) => {
  const resp = await fetch(`ENDPOINT_URI`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${context.spotify.getAccessToken()}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (resp.status === 403) {
    throw new ForbiddenError("SPECIFIC ERR MSG");
  }
  if (resp.status !== 201 /* 200, 204 */)
    throw new UserInputError((await resp.json()).error.message); // From api
  return await resp.json();
};
