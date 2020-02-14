import { createStore } from 'redux';

const INITIAL_STATE = {
  _authToken: null
}

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'REGISTER_SESSION':
      return {
        ...state,
        _authToken: action.authToken,
      };
    case 'DESTROY_SESSION':
      return {
        ...state,
        _authToken: null,
      }
    default: return state 
  }
}
const store = createStore(reducer);
export default store;