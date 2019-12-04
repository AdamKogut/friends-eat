import { FETCH_USER } from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({},state, {id:action.payload || false});
    default:
      return state;
  }
}