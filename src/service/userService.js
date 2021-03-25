import { postRequest, getRequest } from './FetchService';

const apiUrl = 'https://conduit.productionready.io/api/';

export const getRegistrationService = ({ username, email, password }) => {
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  return postRequest(`${apiUrl}users`, JSON.stringify(regData));
};

export const getAuthService = ({ email, password }) => {
  const authData = {
    user: {
      email,
      password,
    },
  };

  return postRequest(`${apiUrl}users/login`, JSON.stringify(authData));
};

export const getUserDataService = (token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return getRequest(`${apiUrl}user`, headers);
};

export const changeUserDataService = (body, token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return postRequest(`${apiUrl}user`, JSON.stringify(body), headers, 'PUT');
};
