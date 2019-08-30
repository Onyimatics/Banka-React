import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from './enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import SignInForm from '../src/components/Signin';

const createStore = (isAuthenticated = false, user = {}, status = 'rest') => {
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
  status: '',
  isAuthenticated: false,
  error: null,
  location: { url: '/user-dashboard' },
  history: { push: jest.fn() }
};


describe('Signin component', () => {

  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <SignInForm {...props} />;
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toBeDefined();
    const field = wrapper.find('input').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('email')

  });

  it('renders one form', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
            
          <SignInForm {...props} />
           
          
        </Router>
      </Provider>
    );
    ;
    expect(wrapper.find('h2').text()).toEqual('SignIn');
    expect(wrapper.find('form')).toBeTruthy();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders 2 input fields and 1 submit button', () => {
    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <SignInForm {...props} />;
         
        </Router>
      </Provider>
    );
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('input').at(0).props().type).toBe('email');
    expect(wrapper.find('input').at(1).props().type).toBe('password');
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('button').at(0).props().type).toBe(undefined);
    expect(wrapper.find('button').at(1).props().type).toBe('submit');
  });
});
