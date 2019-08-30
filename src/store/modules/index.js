import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import accountReducer from './accounts/reducer';
import transactionReducer from './transactions/reducer';

const rootReducer = combineReducers({
  authReducer,
  accountReducer,
  transactionReducer
});
export default rootReducer;
