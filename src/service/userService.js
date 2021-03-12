/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

const postRequest = async (url, body) => {
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body,
  });
  const result = await request.json();

  return result;
};

export const makeRegistration = ({ username, email, password }) => {
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  return postRequest('https://conduit.productionready.io/api/users', JSON.stringify(regData));
};
