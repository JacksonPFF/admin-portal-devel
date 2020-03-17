const axios = require('axios');

import config from 'config';
import { authHeader } from '../_helpers';
import { endpointConstants } from '../_constants';

export const userService = {
  login,
  logout,
  getAll,
  getAllRegistered,
};

const test_serials = [
  "3519100010",
  "4019100039",
  "4019100042"
]
const old_tour_serials = [
  // old tour gitas
  "4319100043",
  "4319100044",
  "4319100045",
  "4319100046",
  "4319100047",
  "4319100048",
  "4319100049",
  "4319100050"
]

const filter_serials = [
  // # b8ta gitas
  "4319100052",
  "4319100055",
  "4319100057",
  "4319100059",
  "4319100060",
  "4319100061",
  "4319100062",
  "4919100096",
  // new tour gitas
  "4919100095",
  "0120100108",
  "0120100111",
  "0120100113",
  "0120100114",
  "0220100121",
  "0220100122",
  "0220100124",
  "0220100125"
]

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

const users = getAll(endpointConstants.USER_ENDPOINT);
const gitas = getAll(endpointConstants.GITA_ENDPOINT);
const registrations = getAll(endpointConstants.REGISTRATION_ENDPOINT);

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
      var registered_gita = findById(gitas, element["gita"])
      if (isSerialLegit(registered_gita["serial"])) {
        var registered_user = findById(users, element["user"])
        //registered_gita["user"] = registered_user
        // Not sure if need null check for (element[created]) 
        output.push(
          //registered_gita
          {
            "serial": registered_gita["serial"].slice(-5),
            "output": "serial: " + registered_gita["serial"] + " name: " + registered_gita["name"] + "\n    registered by: " + registered_user["username"] + ", " + registered_user["email"] + "\n    on: " + element["created"] + "\n",
            "csv_output": "s" + registered_gita["serial"] + "," + registered_gita["name"] + "," + registered_user["username"] + "," + registered_user["email"] + "," + element["created"] + "\n"
          }
        );
      }
    }
  });
  return output 
}

function isSerialLegit(serial){
  if (serial.startsWith("99")) {
    return false 
  }

  if (test_serials.includes(serial)) {
    return false
  }

  // if args.filter == "none":
  //   return True
  if (old_tour_serials.includes(serial)) {
    return false
  }

  // if args.filter == "old-tour":
  //   return True

  if (filter_serials.includes(serial)) {
    return false
  }

  return true
}

function findById(collection, object_id) {
  for(var i=0; i<collection.length; i++){
    if ( collection[i]["id"] === object_id ){
      return collection[i];
    }
  }
}
