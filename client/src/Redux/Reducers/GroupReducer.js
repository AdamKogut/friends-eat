import {GET_GROUPS} from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload || false;
    default:
      return state;
  }
}