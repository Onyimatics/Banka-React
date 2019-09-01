import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from './enzyme';
import UserDashboard from '../src/components/UserDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateAccountForm from '../src/components/CreateAccount';
import DisplayAccounts from '../src/components/DisplayAccounts';

const mockStore = configureMockStore([thunk]);
let store;
const initialSate = {
  data: [],
  error: null,
  status: 'rest'
};

const props = {
  isAuthenticated: true,
  match: {
    params: {
      email: 'onyimatics@gmail.com'
    }
  },
  getAccount: jest.fn(),
  getAccounts: jest.fn(),
createAccounts: jest.fn(),
  location: { url: '/user-dashboard' },
  history: { push: jest.fn() }
};

const renderWithEnzymes = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: false,
      user: {},
      status: 'rest'
    },
    accountReducer: {
      data: [],
      error: null,
      status: 'rest'
    },
    transactionReducer: {
      transactions: [],
      error: null,
      status: 'rest'
    },
    UserDashboard: {
      ...state
    }
  });
  return mount(
    <Provider store={store}>
      <Router>
        <UserDashboard {...props} />
      </Router>
    </Provider>
  );
};

const renderCreateAccount = state => {
  store = mockStore({
    authReducer: {
      error: null,
      isAuthenticated: true,
      user: {},
      status: 'rest'
    },
    accountReducer: {
      data: [],
      error: null,
      status: 'rest'
    },
    CreateAccountForm: {
      ...state
    }
  });
  return mount(
    <Provider store={store}>
      <Router>
        <CreateAccountForm {...props} />
      </Router>
    </Provider>
  );
};


describe('UserDashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store = null;
  });

  it('should have 1 input on dashboard', () => {
    const wrapper = renderWithEnzymes();

    expect(wrapper.find('input').length).toBe(1);
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().type
    ).toBe('file');
  });

  it('should have 1 input on create account page', () => {
    const wrapper = renderCreateAccount();

    expect(wrapper.find('input').length).toBe(1);
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().type
    ).toBe('number');
  });

  it('should have 1 select', () => {
    const wrapper = renderCreateAccount();
    const field = wrapper.find('select').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('type');
  });

  it('should have a send submit button', () => {
    const wrapper = renderCreateAccount();
    const button = wrapper.find("button[type='submit']");
    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual('Create Account');
  });

  it('should render UserDashboard Component', () => {
    const wrapper = renderWithEnzymes();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Create account Component', () => {
    const wrapper = renderWithEnzymes();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should submit a valid form', () => {
    const wrapper = renderCreateAccount();
    const event = {
      preventDefault: jest.fn()
    };
    const typeInput = wrapper.find("select[name='type']");
    const openinBalanceInput = wrapper.find("input[name='openingBalance']");
    typeInput.simulate('change', {
      target: {
        name: 'type',
        value: 'savings'
      }
    });
    openinBalanceInput.simulate('change', {
      target: {
        name: 'openingBalance',
        value: 1000
      }
    });
    wrapper.find('form').simulate('submit', event);

    expect(wrapper.find('CreateAccountForm').state('type')).toEqual('savings');
    expect(wrapper.find('CreateAccountForm').state('openingBalance')).toEqual(1000);

  });
});
