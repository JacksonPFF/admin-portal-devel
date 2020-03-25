import { registeredGitasConstants } from '../_constants';
import { registeredGitasService } from '../_services';

export const registeredGitasActions = {
  getAll,
  filterItems,
};

function getAll() {
  return dispatch => {
      dispatch(request());

      registeredGitasService.getAllRegistered()
          .then(gitas => dispatch(success(gitas)) )
          .then(gitas => dispatch(filter(gitas)) )
          .catch(error => dispatch(failure(error)) );
  };

  function request() { return { type: registeredGitasConstants.GETALL_REQUEST } }
  function success(gitas) { return { type: registeredGitasConstants.GETALL_SUCCESS, gitas } }
  function failure(error) { return { type: registeredGitasConstants.GETALL_FAILURE, error } }
  function filter(results) { return { type: registeredGitasConstants.GETALL_FILTERED_ITEMS, results } }
}

function filterItems(results) {
  return dispatch => {
      dispatch(filter(results));
  }

  function filter(results) { return { type: registeredGitasConstants.GETALL_FILTERED_ITEMS, results } }
};