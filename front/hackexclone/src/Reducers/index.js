import {combineReducers} from 'redux';

import {CHANGING_LOGIN, GLOBAL_CLICK, FADE_DASHBOARD, USER_INFO} from './mainReducer';
import {OTHER_USER} from './otherAccount';

const allReducers = combineReducers({
  CHANGING_LOGIN,
  GLOBAL_CLICK,
  FADE_DASHBOARD,
  USER_INFO,
  OTHER_USER
})

export default allReducers;