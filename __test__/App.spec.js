import React from 'react';
import { shallow, mount, render } from './enzyme';
import toJson from 'enzyme-to-json';
import App from '@components/App';
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'


describe('SAMPLE TEST', () => {
  it('should return a successful sample test ', () => {
    expect(true).toBeTruthy();
  });
  
  it('should render the App component correctly', () => {
    const Wrapper = mount(<App />);
    expect(toJson(Wrapper)).toMatchSnapshot();
  });

  it('should render header without crashing', () => {
    const Wrapper = shallow(<Header />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(Wrapper.find('[to="/"]')).toHaveLength(2);
    expect(Wrapper.find('[to="/signup"]')).toHaveLength(1);
    expect(Wrapper.find('[to="/signin"]')).toHaveLength(1);
    expect(Wrapper.find('NavLink').length).toBeGreaterThan(1);
    expect(Wrapper.find('ul')).toHaveLength(1);
    expect(Wrapper.find('li').length).toBeGreaterThan(1);

  })

  it('should render header without crashing', () => {
    const Wrapper = mount(<Footer />);
    expect(toJson(Wrapper)).toMatchSnapshot();

  })
});

 



