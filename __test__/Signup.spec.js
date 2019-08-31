import React from 'react';
import { mount, shallow } from './enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { rootReducer } from '../src/store/modules/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import SignUpForm from '../src/components/Signup';

import { userToken } from '.././__mocks__/mockData'


const createStore = (isAuthenticated = true, user = {}, status = 'rest') => {
  const content = {
    authReducer: {
      isAuthenticated: true,
      user,
      status: 'authenticationSuccess'
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    authReducer: { ...content, isAuthenticated, user, status }
  });
  return store;
};

const props = {
  authAction: jest.fn(),
  status: 'rest',
  isAuthenticated: false,
  error: null,
  location: { url: '/user-dashboard' },
  history: { push: jest.fn() },
};


describe('Signup component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
         <Switch>
           
            <Route SignUpForm {...props} /> 
          </Switch>
        </Router>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders one form', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <SignUpForm {...props} />;
        </Router>
      </Provider>
    );

    expect(wrapper.find('h2').text()).toEqual('Sign Up');
    expect(wrapper.find('SignUpForm')).toBeTruthy();
    expect(wrapper.find('form')).toBeTruthy();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders 4 input fields and 1 submit button ', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
      
          <SignUpForm {...props} /> 
         
        </Router>
      </Provider>
    );
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('input').at(0).props().type).toBe('text');
    expect(wrapper.find('input').at(1).props().type).toBe('text');
    expect(wrapper.find('input').at(2).props().type).toBe('email');
    expect(wrapper.find('input').at(3).props().type).toBe('password');
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('button').at(0).props().type).toBe(undefined);
    expect(wrapper.find('button').at(1).props().type).toBe('submit');
  });
  it('should submit a valid form', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>

          <SignUpForm {...props} />

        </Router>
      </Provider>

    );

    const event = {
      preventDefault: jest.fn()
    };
    const firstNameInput = wrapper.find("input[name='firstName']");
    const secondNameInput = wrapper.find("input[name='lastName']");
    const emailInput = wrapper.find("input[name='email']");
    const passwordnput = wrapper.find("input[name='password']");
    firstNameInput.simulate('change', {
      target: {
        name: 'firstName',
        value: 'Onyinye'
      }
    });
    secondNameInput.simulate('change', {
      target: {
        name: 'lastName',
        value: 'Ezike'
      }
    });
    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'onyinye@email.com'
      }
    });
    passwordnput.simulate('change', {
      target: {
        name: 'password',
        value: '123456789'
      }
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.find('SignUpForm').state('firstName')).toEqual('Onyinye');
    expect(wrapper.find('SignUpForm').state('lastName')).toEqual("Ezike");
    expect(wrapper.find('SignUpForm').state('email')).toEqual("onyinye@email.com");
    expect(wrapper.find('SignUpForm').state('password')).toEqual("123456789");
 
})
})
