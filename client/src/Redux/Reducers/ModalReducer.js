import {OPEN_MODAL} from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload || false;
    default:
      return state;
  }
}