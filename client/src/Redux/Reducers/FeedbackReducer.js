import {FETCH_FEEDBACK} from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_FEEDBACK:
      return action.payload || false;
    default:
      return state;
  }
}