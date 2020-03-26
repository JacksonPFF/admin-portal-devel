import { combineEpics } from 'redux-observable';
import { skipCodeEpic } from './skipCode';

const rootEpic = combineEpics(
  skipCodeEpic,
);

export default rootEpic;
