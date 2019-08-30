import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './modules';
import getUserInfo from '../utils/getUserInfo';

const loggerMiddleware = createLogger();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}
const user = getUserInfo();
const store = createStore(
  rootReducer,
  {
    authReducer: {
      user,
      isAuthenticated: Boolean(user)
    }
  },
  storeEnhancers(applyMiddleware(...middlewares))
);

export default store;
