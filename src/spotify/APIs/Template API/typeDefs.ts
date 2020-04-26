// For ease of combining types, import all of them then place them into an array
// DocumentNode[] is a well supported type for combining typeDefs in a more central location

import { queryGQL } from "./queries/exapmpleQuery";
export const templateQueryTypeDefs = [queryGQL /*, moreGQL, */];

import { mutationGQL } from "./mutations/exampleMutation";
export const templateMutationTypeDefs = [mutationGQL /*, moreGQL, */];
