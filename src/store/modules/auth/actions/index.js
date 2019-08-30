import axios from 'axios';
import * as Toastr from 'toastr';
import { saveToLocalStorage, decodeToken } from '../../../../utils';
import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE, LOG_OUT } from '../actionTypes';

export const authPending = () => ({
  type: AUTH_PENDING,
  payload: {
    status: 'authenticationPending',
    error: null,
    user: {},
    isAuthenticated: false
  }
});

export const authSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: {
    status: 'authenticationSuccess',
    error: null,
    user,
    isAuthenticated: true
  }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: {
    status: 'authenticationFail',
    error,
    user: {},
    isAuthenticated: false
  }
});

export const loggingout = () => ({
  type: LOG_OUT,
  payload: {
    status: 'rest',
    error,
    user: {},
    isAuthenticated: false
  }
});

export const authAction = ({
  userData,
  history,
  url = undefined
}) => async dispatch => {
  const {
    firstName = undefined,
    lastName = undefined,
    email,
    password
  } = userData;
  dispatch(authPending());

  try {
    const authRoute = firstName ? 'signup' : 'signin';

    const details = firstName
      ? { firstName, lastName, email, password }
      : { email, password };

    const response = await axios({
      method: 'post',
      url: `https://bankaapp.herokuapp.com/api/v2/auth/${authRoute}`,
      data: details
    });
    const { token } = response.data.data;

    saveToLocalStorage({ token, url });

    const user = decodeToken({ history });
    Toastr.success('Welcome to Banka App!');
    dispatch(authSuccess(user));

    return url ? history.push(url) : history.push('/user-dashboard');
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : `${error.message}. It appears you're offline`;
    Toastr.error(message);
    dispatch(authFailure(message));
  }
};


export const logout = () => async dispatch => {
  localStorage.clear();
  await dispatch(loggingout());

}
