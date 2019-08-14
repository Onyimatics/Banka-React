import React from 'react';
import { shallow } from './enzyme';
import Signup from '../src/components/Signup'


const props = {
  Signup: jest.fn(),
  isAuthenticated: true,
  isLoading: false,
};

const setUp = () => shallow(<Signup {...props} />);

describe('Signup component', () => {

  it('renders without crashing', () => {
    const wrapper = setUp();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('renders one form', () => {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
});

it('renders 4 input fields and 1 submit button ', () => {
  const wrapper = setUp();
  expect(wrapper.find('input').length).toBe(4);
  expect(wrapper.find('input').at(0).props().type).toBe('text');
  expect(wrapper.find('input').at(1).props().type).toBe('text');
  expect(wrapper.find('input').at(2).props().type).toBe('email');
  expect(wrapper.find('input').at(3).props().type).toBe('password');
  expect(wrapper.find('button').length).toBe(1);
  expect(wrapper.find('button').at(0).props().type).toBe('submit');
});
})
