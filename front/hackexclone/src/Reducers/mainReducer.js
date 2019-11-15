const mainActions = require('../Actions/mainActions');

const CHANGING_LOGIN = (state = false, action) => {
  switch(action.type){
    case mainActions.G_CHANGING_LOGIN:
      return state;
    case mainActions.S_CHANGING_LOGIN: 
      return action.payload;
    default: return state;
  }
}

const GLOBAL_CLICK = (state = true, action) => {
  switch(action.type) {
    case mainActions.G_GLOBAL_CLICK:
      return state;
    case mainActions.S_GLOBAL_CLICK:
      return action.payload;
    default: return state;
  }
}

const FADE_DASHBOARD = (state = 0, action) => {
  switch(action.type) {
    case mainActions.G_DID_FADE_DASHBOARD:
      return state;
    case mainActions.S_DID_FADE_DASHBOARD:
      return action.payload;
    default: return state;
  }
}

const USER_INFO = (state = {}, action) => {
  switch(action.type){
    case mainActions.G_USER_INFO:
      return state;
    case mainActions.S_USER_INFO:
      return action.payload;
    default: return state;
  }
}

module.exports = {CHANGING_LOGIN, GLOBAL_CLICK, FADE_DASHBOARD, USER_INFO}