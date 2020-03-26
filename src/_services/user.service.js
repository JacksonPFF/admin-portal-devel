import config from 'config';

const axios = require('axios');

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const errorHandler = (error) => {
  if (error.response) {
    const { response } = error;
    if (response.statusText !== 'OK') {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }
    }
    const errorMessage = response.data.message || response.statusText;
    return Promise.reject(errorMessage);
  }
  return Promise.reject(error);
};

const login = (email, password) => {
  const requestOptions = {
    url: `${config.apiUrl}/auth`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ email, password }),
  };

  return axios(requestOptions)
    .then((response) => {
      const { user } = response.data;
      user.token = response.data.token;
      // store user details and jwt token in local storage to
      // keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    })
    .catch((error) => errorHandler(error));
};

export const userService = {
  login,
  logout,
  errorHandler,
};
