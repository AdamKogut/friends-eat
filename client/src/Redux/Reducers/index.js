import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FeedbackReducer from './FeedbackReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
  auth:AuthReducer,
  feedback:FeedbackReducer,
  modal:ModalReducer
});