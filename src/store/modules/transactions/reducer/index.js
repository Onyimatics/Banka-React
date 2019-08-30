import { GET_TRANSACTIONS_PENDING, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAILURE } from '../actionTypes';

export const initialState = {
  transactions: [],
  error: null,
  status: 'rest'
};

const transactionTypes = [GET_TRANSACTIONS_PENDING, GET_TRANSACTIONS_SUCCESS, GET_TRANSACTIONS_FAILURE];
const transactionReducer = (state = initialState, { type, payload }) => {
  return transactionTypes.includes(type) ? { ...state, ...payload } : state;
};
export default transactionReducer;
