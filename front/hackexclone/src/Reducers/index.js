import {combineReducers} from 'redux';

import mainReducer from './mainReducer';

const allReducers = combineReducers({
  [mainReducer] : mainReducer
});

export default allReducers;