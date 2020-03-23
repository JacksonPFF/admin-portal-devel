import { registeredGitasConstants } from '../_constants';
import { registeredGitasService } from '../_services';

export const registeredGitasActions = {
  getAll
};

function getAll() {
  return dispatch => {
      dispatch(request());

      registeredGitasService.getAllRegistered()
          .then(
              gitas => dispatch(success(gitas)),
              error => dispatch(failure(error))
          );
  };

  function request() { return { type: registeredGitasConstants.GETALL_REQUEST } }
  function success(gitas) { return { type: registeredGitasConstants.GETALL_SUCCESS, gitas } }
  function failure(error) { return { type: registeredGitasConstants.GETALL_FAILURE, error } }
}