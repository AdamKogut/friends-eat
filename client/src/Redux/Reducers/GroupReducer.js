import {GET_GROUPS, GET_MY_GROUP} from '../Actions/Types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_GROUPS:
      return Object.assign({},state,{allGroups:action.payload || false});
    case GET_MY_GROUP:
      return Object.assign({},state,{myGroup:action.payload || false});
    default:
      return state;
  }
}