export const getRequest = async (
  url,
  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
) => {
  const request = await fetch(url, {
    method: 'GET',
    headers,
  });
  const result = await request.json();

  return result;
};

export const postRequest = async (
  url,
  body,
  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
) => {
  const request = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });
  const result = await request.json();

  return result;
};
