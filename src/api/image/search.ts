import { get } from "../";
import { ResponseImageAPI } from "../../types/model/Image.types";

type Params = {
  query: string;
};

type RequestOptions = { params: Params };

export function keys<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}

export const searchForImage = (opts?: RequestOptions) => {
  const params = opts?.params;
  const paramsString = params
    ? keys<Params>(params).map((param) => `${param}=${params[param] || ""}`)
    : "";

  const url = `${process.env.REACT_APP_API_BASE_URL}/search/photos`.concat(
    ["?content_filter=high", paramsString].join("&")
  );

  const response = get<ResponseImageAPI>(url, {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_ACCESS}`,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });

  return response;
};
