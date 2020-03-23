const axios = require('axios');

import config from 'config';
import { authHeader, errorHandler } from '../_helpers';
import { endpointConstants } from '../_constants';

export const userService = {
  login,
  logout,
};

function login(email, password) {
  const requestOptions = {
    url: `${config.apiUrl}/auth`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password })
  };

  return axios(requestOptions)
    //.then(handleResponse)
    .then(response => {
      const user = response.data.user;
      user.token = response.data.token;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    })
    .catch(error => errorHandler(error));
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}
