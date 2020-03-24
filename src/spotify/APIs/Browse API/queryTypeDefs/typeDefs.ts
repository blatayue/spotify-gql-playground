import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAllCategories(
      country: String
      locale: String
      limit: Int
      offset: Int
    ): categoryPagingResponse
    getCategory(
      category_id: String
      country: String
      locale: String
    ): CategoryObject
  }
  type categoryPagingResponse {
    categories: PagingObject
  }
`;
