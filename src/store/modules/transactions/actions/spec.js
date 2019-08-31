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
  GET_TRANSACTIONS_PENDING,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE
} from '../actionTypes';

const { allAccountsData, newAccountData, errorData, data } = mockStoreData;

const { authResponse } = mockData;

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  transactionReducer: initialState
});

// jwt decode mock
jest.mock('jwt-decode');
jwtDecode.mockImplementation(() => ({
  exp: (new Date().getTime() + 50000) / 1000,
  ...userInfo
}));

// localstorage mocks
localStorage.getItem = jest.fn().mockImplementation(() => authResponse.token);

describe('GET TRANSACTIONS Action tests', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates ,GET_TRANSACTIONS_PENDING, GET_TRANSACTIONS_SUCCESS when login is successful', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data
      });
    });

    const expectedActions = [
      {
        type: GET_TRANSACTIONS_PENDING,
        payload: {
          transactions: [],
          status: 'transactionPending',
          error: null
        }
      },
      {
        type: GET_TRANSACTIONS_SUCCESS,
        payload: {
          transactions: data,
          status: 'transactionSuccess',
          error: null
        }
      }
    ];
    return store.dispatch(actions.getTransactions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  // it.only('creates GET_TRANSACTIONS_FAILURE on login failure', () => {
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 400
  //     });
  //   });

  //   const expectedActions = [
  //     { type: GET_TRANSACTIONS_PENDING,
  //       payload: {
  //         transactions: [],
  //         status: 'transactionPending',
  //         error: null
  //       }
  //     },
  //     {
  //       type: GET_TRANSACTIONS_FAILURE,
  //       payload: {
  //         status: 'transactionFailure',
  //         error: "[Error: Request failed with status code 400]"
  //       }
  //     }
  //   ];
  //   return store.dispatch(actions.getTransactions()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
});