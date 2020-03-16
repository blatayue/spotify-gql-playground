import refetch from "@hazelee/refetch";
import qs from "qs";

interface apiWrapper {
  args: {
    [key: string]: string;
  };
  endpoint: string;
  method: string;
  qstring?: string;
  headers?: string;
  optionalBody?: string;
  authToken: string;
}
const wrapper = async (args: apiWrapper) => {
  return await refetch(
    `https://api.spotify.com/v1${args.endpoint}${qs.stringify(args.qstring)}`,
    {}
  ).json();
};

interface pathIdRequest {
  args: {
    [key: string]: string;
  };
  endpoint: string;
  qstring: string;
  authToken: string;
}

interface jsonPostRequest {
  args: {
    [key: string]: string;
  };
  endpoint: string;
  body: string;
  authToken: string;
}

interface pathParamRequest {}
