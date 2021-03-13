/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { postRequest, getRequest } from './FetchService';

export const getRegistration = ({ username, email, password }) => {
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  return postRequest('https://conduit.productionready.io/api/users', JSON.stringify(regData));
};

export const getAuth = ({ email, password }) => {
  const authData = {
    user: {
      email,
      password,
    },
  };

  return postRequest('https://conduit.productionready.io/api/users/login', JSON.stringify(authData));
};

export const getUserData = (token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return getRequest('https://conduit.productionready.io/api/user', headers);
};
