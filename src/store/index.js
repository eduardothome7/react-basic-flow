import { createStore } from 'redux';

const INITIAL_STATE = {
  _authToken: null
}

function reducer(state = INITIAL_STATE, action){
  return state;
}

const store = createStore(reducer);

export default store;