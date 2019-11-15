import ma from './mainActions';

// Setters 
export const SET_CHANGING_LOGIN = newVal => {
  return {
    type: ma.S_CHANGING_LOGIN,
    payload: newVal
  };
}

export const SET_GLOBAL_CLICK = newVal => {
  return {
    type: ma.S_GLOBAL_CLICK,
    payload: newVal
  }
}

export const SET_DID_FADE_DASHBOARD = newVal => {
  return {
    type: ma.S_DID_FADE_DASHBOARD,
    payload: newVal
  }
}

export const SET_USER_INFO = newVal => {
  return {
    type: ma.S_USER_INFO,
    payload: newVal
  }
}

// module.exports = {SET_CHANGING_LOGIN, SET_GLOBAL_CLICK, SET_DID_FADE_DASHBOARD, SET_USER_INFO}