const mainActions = require('../Actions/mainActions');

const OTHER_USER = (state = {}, action)=> {
  switch(action){
    case mainActions.G_OTHER_USER:
      return state;
    case mainActions.S_OTHER_USER:
      return action.payload;
    default: return state;
  }
}

module.exports = {OTHER_USER}