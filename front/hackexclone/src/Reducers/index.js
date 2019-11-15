import {combineReducers} from 'redux';

import {CHANGING_LOGIN, GLOBAL_CLICK, FADE_DASHBOARD, USER_INFO} from './mainReducer';

const allReducers = combineReducers({
  CHANGING_LOGIN,
  GLOBAL_CLICK,
  FADE_DASHBOARD,
  USER_INFO
})

export default allReducers;