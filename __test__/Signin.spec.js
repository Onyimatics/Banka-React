import React from 'react';
import { shallow } from './enzyme';
import Signin from '../src/components/Signin'


const props = {
  Signin: jest.fn(),
  isAuthenticated: false,
  isLoading: false,
};

const setUp = () => shallow(<Signin {...props} />);

describe('Signin component', () => {

  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('renders one form', () => {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders 2 input fields and 1 submit button', () => {
    const wrapper = setUp();
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('input').at(0).props().type).toBe('email');
    expect(wrapper.find('input').at(1).props().type).toBe('password');
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').at(0).props().type).toBe('submit');
  });
})
