import axios from 'axios';
import {
  getSuccessResponse,
  getErrorResponse
} from '../../../../utils/getResponse';
import {
  GET_TRANSACTIONS_PENDING,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE
} from '../actionTypes';

export const getTransactionPending = () => ({
  type: GET_TRANSACTIONS_PENDING,
  payload: {
    status: 'transactionPending',
    error: null,
    transactions: []
  }
});

export const getTransactionSuccess = data => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: {
    status: 'transactionSuccess',
    error: null,
    transactions: data
  }
});

export const getTransactionFailure = (error) => ({
  type: GET_TRANSACTIONS_FAILURE,
  payload: {
    status: 'transactionFailure',
    error
  }
});

export const getTransactions = accountNumber => async dispatch => {
  const token = localStorage.getItem('token');

  dispatch(getTransactionPending());
  try {
    const response = await axios({
      method: 'get',
      baseURL: `https://bankaapp.herokuapp.com/api/v2/accounts/${accountNumber}/transactions`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    const { data } = getSuccessResponse(response);
    dispatch(getTransactionSuccess(data));
  } catch (error) {
    const message = getErrorResponse(error);
    dispatch(getTransactionFailure(message));
  }
};
