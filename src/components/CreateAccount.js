import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { createAccounts } from '../store/modules/accounts/actions';
import { logout } from '../store/modules/auth/actions';
import Footer from './Footer'

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      openingBalance: ''
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  handleCreateAccount(e) {
    e.preventDefault();
    const { createAccounts } = this.props;
    const { type, openingBalance } = this.state;

    const errors = {};
    if (!type) errors.type = 'Account type can only be Savings or Current';
    if (!openingBalance)
      errors.openingBalance = 'Opening balance cannot be empty';
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...errors
        }
      }));
      return;
    }
    const { history } = this.props;
    createAccounts({ type, openingBalance }, history);
  }

  handleInputOnChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <Link to="./" className="navbar-logo">
              Banka
            </Link>
            <button className="hamburger-menu">
              <a className="hamburger" />
            </button>
            <ul className="navbar-menu">
              <li className="navbar-link">
                <Link to="./">Home</Link>
              </li>
              <li className="navbar-link">
                <Link to="/user-dashboard">My Profile</Link>
              </li>
              <li className="navbar-link">
                <Link to='/' onClick={this.props.logout}>Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section className="container form-container">
            <h2 className="section-title">Create Account</h2>
            <form className="form-card" onSubmit={this.handleCreateAccount} data-testid="submit-form">
              <div className="errors">
                <ul></ul>
              </div>
              <label htmlFor="type">Account Type</label>
              <select
                type="text"
                data-testid="type"
                id="type"
                name="type"
                className="form-element"
                required
                onChange={this.handleInputOnChange}
              >
                <option default>-- Savings/Current? --</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
              <div className="error" id="account-type-error" />
              <label htmlFor="openingBalance">Opening Amount</label>
              <input
                type="number"
                data-testid="openingBalance"
                id="openingBalance"
                name="openingBalance"
                className="form-element"
                placeholder={10000.0}
                required
                onChange={this.handleInputOnChange}
              />
              <div className="error" id="opening-amount-error" />
              <button type="submit" className="btn btn-primary" data-testid="submit">
                Create Account
              </button>
            </form>
          </section>
        </main>
      <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  accounts: state.accountReducer.accounts
});

const mapDispatchToProps = {
  createAccounts,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountForm);
