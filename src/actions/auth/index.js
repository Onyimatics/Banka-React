import actionTypes from './actionTypes';

const { LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_FAILURE } = actionTypes;

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
    loading: false,
    isAuthenticated: true
  }
});
