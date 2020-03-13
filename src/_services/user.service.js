const axios = require('axios');

import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  getAll
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

function getAll() {
  const requestOptions = {
    url: `${config.apiUrl}/gitas`,
    method: 'GET',
    headers: authHeader()
  };

  return axios(requestOptions)
    .then(response => {
      const data = response.data;

      return data;
    })
    .catch(error => errorHandler(error));
}

function errorHandler(error) {
  const response = error.response;
  if (response.statusText !== 'OK') {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      //location.reload(true);
    }
  }
  const errorMessage = response.data.message || response.statusText;
  return Promise.reject(errorMessage);
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }