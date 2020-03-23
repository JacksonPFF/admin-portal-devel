import { userService } from '../_services';

export function errorHandler(error) {
  if (error.response) {
    const response = error.response;
    if (response.statusText !== 'OK') {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        //location.reload(true);
      }
    }
    const errorMessage = response.data.message || response.statusText;
    return Promise.reject(errorMessage);
  } else {
    return Promise.reject(error);
  }
}
