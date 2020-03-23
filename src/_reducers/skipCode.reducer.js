import { skipCodeConstants } from '../_constants';

const initialState = {
  data: false,
  polling: false,
};

export const skipCode = (state = initialState, action) => {
  switch (action.type) {
    case skipCodeConstants.SKIPCODE_POLL_START:
      return {
        ...state,
        polling: true,
      }
    case skipCodeConstants.SKIPCODE_POLL_STOP:
      return {
        ...state,
        polling: false,
      }
    case skipCodeConstants.SKIPCODE_POLL_SUCCESS:
      return {
        ...state,
        data: action.skipCode
      };
    default:
      return state;
  }
};
