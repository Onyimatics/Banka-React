import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT_PENDING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE
} from '../actionTypes';

export const initialState = {
  data: [],
  error: null,
  status: 'rest'
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACCOUNTS_PENDING:
    case GET_ACCOUNTS_SUCCESS:
    case GET_ACCOUNTS_FAILURE:
    case CREATE_ACCOUNT_PENDING:
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        ...payload
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...payload,
        data: [payload.account, ...state.data]
      };
    default:
      return state;
  }
};

export default accountReducer;
