import {GET_PREFERENCES} from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_PREFERENCES:
      return action.payload || false;
    default:
      return state;
  }
}