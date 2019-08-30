import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE, LOG_OUT } from '../actionTypes';

export const initialState = {
  error: null,
  isAuthenticated: false,
  user: {},
  status: 'rest'
};

const authTypes = [AUTH_PENDING, AUTH_FAILURE, AUTH_SUCCESS, ];
const authReducer = (state = initialState, { type, payload }) => {
  return authTypes.includes(type) ? { ...state, ...payload } : state;
};
export default authReducer;
