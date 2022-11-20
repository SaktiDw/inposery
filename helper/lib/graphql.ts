import { request, GraphQLClient } from "graphql-request";
import { getAccessToken } from "./token";

export const graphql = async (query: any, variables?: any) => {
  const endpoint = "http://localhost:8810/graphql";
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return await request({
    url: endpoint,
    document: query,
    variables: variables,
    requestHeaders: headers,
  }).then((data) => data);
};
