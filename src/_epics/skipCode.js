const axios = require('axios');
import config from 'config';
import { skipCodeConstants } from '../_constants';
import { authHeader } from '../_helpers';
import { ofType } from 'redux-observable';
import { 
  withLatestFrom,
  switchMap,
  takeUntil,
  distinctUntilChanged,
  map, 
} from 'rxjs/operators';
import { timer, from } from 'rxjs';

export const skipCodeEpic = (action$, state$) => {
  const stopPolling$ = action$.pipe(
    ofType(skipCodeConstants.SKIPCODE_POLL_STOP)
  )
  return action$.pipe(
    ofType(skipCodeConstants.SKIPCODE_POLL_START),
    withLatestFrom(state$, (state) => {
      
      const params = {
        url: `${config.apiUrl}` + "/skip-codes",
        method: 'GET',
        headers: authHeader()
      }
      return params
    }),
    switchMap(params => {
       return timer(0, 15000).pipe(
          takeUntil(stopPolling$), 
          switchMap(() => from(axios(params))),
          //distinctUntilChanged(isDeepEqual),
          map(response => ({
            type: skipCodeConstants.SKIPCODE_POLL_SUCCESS, 
            skipCode: response.data.skipCode
          }))
       )
    })
  )
}