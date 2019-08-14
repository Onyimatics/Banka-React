import actionTypes from '../actions/actionTypes';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } = actionTypes;

const initialState = {
  user: {},
  loading: false,
  error: false,
  isAuthenticated: false,
  errorMessage: ''
};

const auth = (state = initialState, action) => {
  const {
    payload: { loading, error, user, isAuthenticated, errorMessage } = {}
  } = action;
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading,
        error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user,
        loading,
        isAuthenticated
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error,
        loading,
        errorMessage
      };
    default:
      return state;
  }
};

export default auth;