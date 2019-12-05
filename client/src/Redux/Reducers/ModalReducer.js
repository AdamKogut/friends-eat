import {OPEN_MODAL, OPEN_DRAWER} from '../Actions/Types';

export default function(state = {drawer:false}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({},state,{modal:action.payload || false});
    case OPEN_DRAWER:
        return Object.assign({},state,{drawer:action.payload || false});
    default:
      return state;
  }
}