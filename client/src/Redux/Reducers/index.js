import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FeedbackReducer from './FeedbackReducer';
import ModalReducer from './ModalReducer';
import HistoryReducer from './HistoryReducer';
import GroupReducer from './GroupReducer';

export default combineReducers({
  auth:AuthReducer,
  feedback:FeedbackReducer,
  modal:ModalReducer,
  history:HistoryReducer,
  groups:GroupReducer
});