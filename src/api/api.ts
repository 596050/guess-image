const buildRequestMethod = (method: string) => async <T>(
  pathname: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(pathname, { method, ...options }).then((response) => {
    if (!response?.ok) {
      throw new Error(response.statusText);
    }
    return response?.json();
  });
};

export const get = buildRequestMethod("GET");
