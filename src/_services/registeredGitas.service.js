import config from 'config';
import { authHeader } from '../_helpers';
import {
  endpointConstants,
  serialConstants,
} from '../_constants';
import { userService } from '.';

const axios = require('axios');
const _ = require('lodash');

const isSerialLegit = (serial) => {
  if (serial.startsWith('99')) {
    return false;
  }
  if (serialConstants.TEST_SERIALS.includes(serial)) {
    return false;
  }
  // if args.filter == "none":
  //   return True
  if (serialConstants.OLD_TOUR_SERIALS.includes(serial)) {
    return false;
  }
  // if args.filter == "old-tour":
  //   return True
  if (serialConstants.FILTER_SERIALS.includes(serial)) {
    return false;
  }
  return true;
};

const findRegsiteredGitas = (users, gitas, registrations) => {
  let output = [];
  registrations.forEach((element) => {
    if (element.active) {
      const registeredGita = _.find(gitas, ['id', element.gita]);
      if (isSerialLegit(registeredGita.serial)) {
        const registeredUser = _.find(users, ['id', element.user]);
        output.push({
          serial: registeredGita.serial.slice(-5),
          output: {
            serial: registeredGita.serial,
            name: registeredGita.name,
            registeredByUsername: registeredUser.username,
            registeredByEmail: registeredUser.email,
            created: element.created,
          },
          csv_output:
            `s${registeredGita.serial},
            ${registeredGita.name},
            ${registeredUser.username},
            ${registeredUser.email},
            ${element.created}\n`,
        });
      }
    }
  });
  output = _.orderBy(output, ['serial'], ['asc']);
  return output;
};

const getAll = (endpoint) => {
  const requestOptions = {
    url: `${config.apiUrl}${endpoint}`,
    method: 'GET',
    headers: authHeader(),
  };

  return axios(requestOptions);
};

const getAllRegistered = () => {
  let users = getAll(endpointConstants.USER_ENDPOINT);
  let gitas = getAll(endpointConstants.GITA_ENDPOINT);
  let registrations = getAll(endpointConstants.REGISTRATION_ENDPOINT);

  return axios.all([users, gitas, registrations]).then(axios.spread((...responses) => {
    users = responses[0].data;
    gitas = responses[1].data;
    registrations = responses[2].data;
    // const data = gitas.data;
    const output = findRegsiteredGitas(users, gitas, registrations);

    return output;
  }))
    .catch((error) => userService.errorHandler(error));
};

export const registeredGitasService = {
  getAllRegistered,
};
