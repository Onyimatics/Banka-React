import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { initialState } from '../reducer/index';
import mockData from '../../../../../__mocks__/mockData';
import * as actions from './index';

import { AUTH_PENDING, AUTH_SUCCESS, AUTH_FAILURE } from '../actionTypes';

const mockStore = configureMockStore([thunk]);

const { authResponse } = mockData;

const store = mockStore({
  authReducer: initialState
});

// jwt decode mock
jest.mock('jwt-decode');
jwtDecode.mockImplementation(() => ({
  exp: (new Date().getTime() + 50000) / 1000,
  ...authResponse
}));

// localstorage mocks
localStorage.getItem = jest.fn().mockImplementation(() => authResponse.token);

// history mock
const history = {
  push: jest.fn()
};

const dispatch = jest.fn(() => ({
  type: AUTH_SUCCESS,
  payload: {
    user: authResponse,
    status: 'authenticationSuccess',
    isAuthenticated: true,
    error: null
  }
}));

describe('Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates AUTH_SUCCESS, AUTH_PENDING when login is successful', () => {
    const userData = {
      email: 'email@email.com',
      password: 'Password',
      username: 'usernam'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: authResponse
      });
    });
    const expectedActions = [
      {
        type: AUTH_PENDING,
        payload: {
          isAuthenticated: false,
          user: {},
          status: 'authenticationPending',
          error: null
        }
      },
      {
        type: AUTH_SUCCESS,
        payload: {
          user: authResponse,
          status: 'authenticationSuccess',
          isAuthenticated: true,
          error: null
        }
      }
    ];

    return store
      .dispatch(
        actions.authAction({
          userData: { email: '', password: '' },
          history,
          url: '/'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates AUTH_SUCCESS, AUTH_PENDING when login is successful even when hisory and url is not passed', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: authResponse
      });
    });
    const userData = {
      email: 'email@email.com',
      password: 'Password',
      username: 'usernam'
    };
    const expectedActions = [
      {
        type: AUTH_PENDING,
        payload: {
          isAuthenticated: false,
          user: {},
          status: 'authenticationPending',
          error: null
        }
      },
      {
        type: AUTH_SUCCESS,
        payload: {
          user: authResponse,
          status: 'authenticationSuccess',
          isAuthenticated: true,
          error: null
        }
      }
    ];

    return store
      .dispatch(
        actions.authAction({
          userData: { email: '', password: '' },
          history,
          url: ''
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates AUTH_FAILURE on login failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: authResponse
      });
    });

    const userData = {
      email: 'email@email.com',
      password: 'Password',
      username: 'usernam'
    };
    const expectedActions = [
      {
        type: AUTH_PENDING,
        payload: {
          isAuthenticated: false,
          user: {},
          status: 'authenticationPending',
          error: null
        }
      },
      {
        type: AUTH_FAILURE,
        payload: {
          user: {},
          status: 'authenticationFail',
          error: undefined,
          isAuthenticated: false
        }
      }
    ];
    return store
      .dispatch(
        actions.authAction({ userData: { email: '', password: '' }, history })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
