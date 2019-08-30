import authReducer, { initialState } from './index';
import { authPending, authSuccess, authFailure } from '../actions';

let action;
let newState;
const user = { email: 'mylove@gmail.com', password: 'mylove123' };
describe('Auth Reducer', () => {
  it('should return initial state for unkwon action types', () => {
    action = { type: null };
    newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
    expect(newState.error).toEqual(null);
    expect(newState.status).toEqual('rest');
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual({});
  });
  it('should handle action with type AUTH_PENDING', () => {
    const { type, payload } = authPending();
    newState = authReducer(initialState, { type, payload });
    expect(type).toEqual('AUTH_PENDING');
    expect(payload.status).toEqual('authenticationPending');
    expect(payload.error).toEqual(null);
    expect(payload.user).toEqual({});
    expect(payload.isAuthenticated).toEqual(false);
  });
  it('should handle action with type AUTH_SUCCESS', () => {
    const { type, payload } = authSuccess(user);
    newState = authReducer(initialState, { type, payload });
    expect(type).toEqual('AUTH_SUCCESS');
    expect(payload.status).toEqual('authenticationSuccess');
    expect(payload.error).toEqual(null);
    expect(payload.user).toEqual(user);
    expect(payload.isAuthenticated).toEqual(true);
  });
  it('should handle action with type AUTH_FAILURE', () => {
    const { type, payload } = authFailure();
    newState = authReducer(initialState, { type, payload });
    expect(type).toEqual('AUTH_FAILURE');
    expect(payload.status).toEqual('authenticationFail');
    expect(payload.user).toEqual({});
    expect(payload.isAuthenticated).toEqual(false);
  });
});
