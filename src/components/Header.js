import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <nav className="navbar" id="navbar-close">
        <NavLink to="/" className="navbar-logo">
          Banka
        </NavLink>
        <button className="hamburger-menu">
          <a className="hamburger" />
        </button>
        <ul className="navbar-menu">
          <li className="navbar-NavLink">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navbar-NavLink">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li className="navbar-NavLink">
            <NavLink to="/signin">Signin</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
