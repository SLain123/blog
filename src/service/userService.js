/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

const test = {
  user: {
    username: 'Jacob6dfgfd33d',
    email: 'jak4f6e@ya.jake',
    password: 'jak32143ejddake',
  },
};

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

export const makeRegistration = () =>
  postRequest('https://conduit.productionready.io/api/users', JSON.stringify(test))
    .then((res) => {
      if (res.errors) {
        console.log(`fail ${res.errors}`);
      }
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
