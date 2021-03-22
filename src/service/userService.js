import { postRequest, getRequest } from './FetchService';

export const getRegistrationService = ({ username, email, password }) => {
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  return postRequest('https://conduit.productionready.io/api/users', JSON.stringify(regData));
};

export const getAuthService = ({ email, password }) => {
  const authData = {
    user: {
      email,
      password,
    },
  };

  return postRequest('https://conduit.productionready.io/api/users/login', JSON.stringify(authData));
};

export const getUserDataService = (token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return getRequest('https://conduit.productionready.io/api/user', headers);
};

export const changeUserDataService = (body, token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return postRequest('https://conduit.productionready.io/api/user', JSON.stringify(body), headers, 'PUT');
};
