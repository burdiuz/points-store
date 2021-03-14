export const fetchApi = (url, baseOptions = {}) => (
  options = {},
  body = undefined,
) =>
  fetch(`/api/${url.replace(/^\//, '')}`, {
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...baseOptions,
    ...options,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then((response) => response.json());
