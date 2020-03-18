const axios = require('axios');
const _ = require('lodash');

import config from 'config';
import { authHeader } from '../_helpers';
import { 
  endpointConstants,
  serialConstants,
} from '../_constants';

export const userService = {
  login,
  logout,
  getAll,
  getAllRegistered,
};

const users = getAll(endpointConstants.USER_ENDPOINT);
const gitas = getAll(endpointConstants.GITA_ENDPOINT);
const registrations = getAll(endpointConstants.REGISTRATION_ENDPOINT);

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

function getAll(endpoint) {
  const requestOptions = {
    url: `${config.apiUrl}` + endpoint,
    method: 'GET',
    headers: authHeader()
  };

  return axios(requestOptions)
}

function getAllRegistered() {

  return axios.all([users, gitas, registrations]).then(axios.spread((...responses) => {
    const users = responses[0].data;
    const gitas = responses[1].data;
    const registrations = responses[2].data;
    //const data = gitas.data;
    let output = findRegsiteredGitas(users, gitas, registrations);

    return output;

    })).catch(error => errorHandler(error));
}

function errorHandler(error) {
  if (error.response) {
    if (response.statusText !== 'OK') {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }
    }
    const errorMessage = response.data.message || response.statusText;
    return Promise.reject(errorMessage);
  } else {
    return Promise.reject(error);
  }
}

function findRegsiteredGitas(users, gitas, registrations){
  let output = [];
  registrations.forEach(element => { 
    if (element["active"]) {
      var registered_gita = _.find(gitas, ['id', element["gita"]]);
      if (isSerialLegit(registered_gita["serial"])) {
        var registered_user = _.find(users, ['id', element["user"]]);
        output.push({
          "serial": registered_gita["serial"].slice(-5),
          "output": "serial: " + registered_gita["serial"] + " name: " + registered_gita["name"] + "\n    registered by: " + registered_user["username"] + ", " + registered_user["email"] + "\n    on: " + element["created"] + "\n",
          "csv_output": "s" + registered_gita["serial"] + "," + registered_gita["name"] + "," + registered_user["username"] + "," + registered_user["email"] + "," + element["created"] + "\n"
        });
      }
    }
  });
  output.sort((a, b) => (a["serial"] > b["serial"]) ? 1 : -1)
  return output 
}

function isSerialLegit(serial){
  if (serial.startsWith("99")) {
    return false 
  }

  if (serialConstants.TEST_SERIALS.includes(serial)) {
    return false
  }

  // if args.filter == "none":
  //   return True
  
  if (serialConstants.OLD_TOUR_SERIALS.includes(serial)) {
    return false
  }

  // if args.filter == "old-tour":
  //   return True

  if (serialConstants.FILTER_SERIALS.includes(serial)) {
    return false
  }

  return true
}
