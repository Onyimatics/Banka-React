import accountReducer, { initialState } from './index';
import {
  getAccountPending,
  getAccountSuccess,
  getAccountFailure,
  createAccountPending,
  createAccountSuccess,
  createAccountFailure
} from '../actions';
import { mockStoreData } from '../../../../../__mocks__/mockData';

let action;
let newState;
const details = { type: 'current', openingBalance: 1000 };
const data = mockStoreData.accountReducer;
describe('Account Reducer', () => {
  it('should return initial state for unknown action types', () => {
    action = { type: null };
    newState = accountReducer(initialState, action);
    expect(newState).toEqual(initialState);
    expect(newState.error).toEqual(null);
    expect(newState.status).toEqual('rest');
    expect(newState.data).toEqual([]);
  });
  it('should handle action with type GET_ACCOUNTS_PENDING', () => {
    const { type, payload } = getAccountPending();
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('GET_ACCOUNTS_PENDING');
    expect(payload.status).toEqual('accountPending');
    expect(payload.error).toEqual(null);
  });
  it('should handle action with type GET_ACCOUNTS_SUCCESS', () => {
    const { type, payload } = getAccountSuccess(data);
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('GET_ACCOUNTS_SUCCESS');
    expect(payload.status).toEqual('accountSuccess');
    expect(payload.error).toEqual(null);
    expect(payload.data).toEqual(data);
  });
  it('should handle action with type GET_COMMENT_FAILURE', () => {
    const { type, payload } = getAccountFailure();
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('GET_ACCOUNTS_FAILURE');
    expect(payload.status).toEqual('accountFailure');
  });
  it('should handle action with type CREATE_ACCOUNT_PENDING', () => {
    const { type, payload } = createAccountPending();
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('CREATE_ACCOUNT_PENDING');
    expect(payload.status).toEqual('createAccountPending');
    expect(payload.error).toEqual(null);
  });
  it('should handle action with type CREATE_ACCOUNT_SUCCESS', () => {
    const { type, payload } = createAccountSuccess(details);
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('CREATE_ACCOUNT_SUCCESS');
    expect(payload.status).toEqual('createAccountSuccess');
    expect(payload.error).toEqual(null);
    expect(payload.data).toEqual(details);
  });
  it('should handle action with type CREATE_ACCOUNT_FAILURE', () => {
    const { type, payload } = createAccountFailure();
    newState = accountReducer(initialState, { type, payload });
    expect(type).toEqual('CREATE_ACCOUNT_FAILURE');
    expect(payload.status).toEqual('createAccountFailure');
  });
});
