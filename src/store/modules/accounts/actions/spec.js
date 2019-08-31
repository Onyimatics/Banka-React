import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import jwtDecode from 'jwt-decode';
import { mount } from '../../../../../__test__/enzyme';
import thunk from 'redux-thunk';
import { initialState } from '../reducer/index';
import * as actions from './index';
import userInfo from '../../../../utils/getUserInfo';
import mockData, { mockStoreData } from '../../../../../__mocks__/mockData';

import {
  GET_ACCOUNTS_PENDING,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT_PENDING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE
} from '../actionTypes';

const { allAccountsData, newAccountData, errorData, data } = mockStoreData;

const { authResponse } = mockData;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  accountReducer: initialState
});

// jwt decode mock
jest.mock('jwt-decode');
jwtDecode.mockImplementation(() => ({
  exp: (new Date().getTime() + 50000) / 1000,
  ...userInfo
}));

// localstorage mocks
localStorage.getItem = jest.fn().mockImplementation(() => authResponse.token);

describe('GET ACCOUNTS Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it.skip('creates ,GET_ACCOUNTS_PENDING, GET_ACCOUNTS_SUCCESS when login is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: allAccountsData
      });
    });

    const expectedActions = [
      {
        type: GET_ACCOUNTS_PENDING,
        payload: {
          data: [],
          status: 'accountPending',
          error: null
        }
      },
      {
        type: GET_ACCOUNTS_SUCCESS,
        payload: {
          data: {
            rows: [
              {
                Balance: 2000,
                accountNumber: 1102345718,
                createdOn: '2019-08-29T00:43:11.908Z',
                status: 'active',
                type: 'savings'
              }
            ],
          },
          status: 'accountSuccess',
          error: null
        }
      }
    ];
    return store.dispatch(actions.getAccounts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_ACCOUNTS_FAILURE on login failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data
      });
    });

    const expectedActions = [
      {
        type: GET_ACCOUNTS_PENDING,
        payload: {
          data: [],
          status: 'accountPending',
          error: null
        }
      },
      {
        type: GET_ACCOUNTS_FAILURE,
        payload: {
          status: 'accountFailure',
          error: "Request failed with status code 400"
        }
      }
    ];
    return store.dispatch(actions.getAccounts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('CREATE ACCOUNT Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it.skip('creates ,CREATE_ACCOUNT_PENDING, POST_ACCOUNT_SUCCESS when login is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newAccountData
      });
    });

    const expectedActions = [
      {
        type: CREATE_ACCOUNT_PENDING,
        payload: {
          status: 'createAccountPending',
          error: null
        }
      },
      {
        type: CREATE_ACCOUNT_SUCCESS,
        payload: {
          data: {
            ...newAccountData.data,
          },
          status: 'createAccountSuccess',
          error: null
        }
      }
    ];
    const type = 'savings';
    const openingBalance = 1000;
    return store
      .dispatch(actions.createAccounts({ type, openingBalance }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates ,CREATE_ACCOUNT_PENDING, CREATE_ACCOUNT_FAILURE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: errorData
      });
    });

    const expectedActions = [
      {
        type: CREATE_ACCOUNT_PENDING,
        payload: {
          status: 'createAccountPending',
          error: null
        }
      },
      {
        type: CREATE_ACCOUNT_FAILURE,
        payload: {
          status: 'createAccountFailure',
          error: 'Unable to create account'
        }
      }
    ];
    const type = 'savings';
    const openingBalance = 1000;
    return store
      .dispatch(actions.createAccounts({ type, openingBalance }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
