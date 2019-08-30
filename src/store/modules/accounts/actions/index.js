import axios from 'axios';
import * as Toastr from 'toastr';
import {
  getSuccessResponse,
  getErrorResponse
} from '../../../../utils/getResponse';
import getUserInfo from '../../../../utils/getUserInfo';
import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT_PENDING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE
} from '../actionTypes';

export const getAccountPending = () => ({
  type: GET_ACCOUNTS_PENDING,
  payload: {
    status: 'accountPending',
    error: null,
    data: []
  }
});

export const getAccountSuccess = data => ({
  type: GET_ACCOUNTS_SUCCESS,
  payload: {
    status: 'accountSuccess',
    error: null,
    data
  }
});

export const getAccountFailure = (error) => ({
  type: GET_ACCOUNTS_FAILURE,
  payload: {
    status: 'accountFailure',
    error
  }
});

export const createAccountPending = () => ({
  type: CREATE_ACCOUNT_PENDING,
  payload: {
    status: 'createAccountPending',
    error: null
  }
});

export const createAccountSuccess = data => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: {
    status: 'createAccountSuccess',
    error: null,
    data
  }
});

export const createAccountFailure = error => ({
  type: CREATE_ACCOUNT_FAILURE,
  payload: {
    status: 'createAccountFailure',
    error
  }
});
export const getAccounts = () => async dispatch => {
  const token = localStorage.getItem('token');
  const userData = getUserInfo();

  dispatch(getAccountPending());
  try {
    const response = await axios({
      method: 'get',
      baseURL: `https://bankaapp.herokuapp.com/api/v2/user/${userData.email}/accounts`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    const { data } = getSuccessResponse(response);
    dispatch(getAccountSuccess(data));
  } catch (error) {
    const message = getErrorResponse(error);
    dispatch(getAccountFailure(message));
  }
};

export const createAccounts = (
  { type, openingBalance },
  history
) => async dispatch => {
  dispatch(createAccountPending());
  const token = localStorage.getItem('token');
  try {
    const details = { type, openingBalance };
    const response = await axios({
      method: 'post',
      baseURL: 'https://bankaapp.herokuapp.com/api/v2/accounts',
      data: details,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    const { data } = getSuccessResponse(response);
    dispatch(createAccountSuccess(data));
    Toastr.success('Successfully created an account!');
    history.push('/user-dashboard');
  } catch (error) {
    const message = getErrorResponse(error);
    Toastr.error(message);
    dispatch(createAccountFailure(message));
  }
};
