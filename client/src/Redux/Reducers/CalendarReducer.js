import { CALENDAR_DAY, CALENDAR_INFO } from '../Actions/Types';

export default function(state = null, action) {
  switch (action.type) {
    case CALENDAR_DAY:
      return Object.assign({},state,{day:action.payload || false});
    case CALENDAR_INFO:
      return Object.assign({},state,{info:action.payload || false});
    default:
      return state;
  }
}