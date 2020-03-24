import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAllCategories(
      country: String
      locale: String
      limit: Int
      offset: Int
    ): categoryPagingResponse
  }

  type categoryPagingResponse {
      categories: PagingObject
  }
`;
