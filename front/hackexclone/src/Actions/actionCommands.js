import ma from './mainActions';

const SET_CHANGING_LOGIN = newVal => {
  return {
    type: ma.S_CHANGING_LOGIN,
    payload: newVal
  };
}

const SET_GLOBAL_CLICK = newVal => {
  return {
    type: ma.S_GLOBAL_CLICK,
    payload: newVal
  }
}

module.exports = {SET_CHANGING_LOGIN}