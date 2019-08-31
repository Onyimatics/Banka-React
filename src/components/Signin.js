import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { authAction } from '../store/modules/auth/actions';
import checkStatus from '../utils/checkStatus';

export class SignInForm extends Component {
  constructor() {
    super();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.state = {
      submittting: false,
      email: '',
      password: ''
    };
  }

  userLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { authAction: loginAction } = this.props;
    const errors = {};
    if (!email) errors.email = 'Email cannot be empty';
    if (!password) errors.password = 'Password cannot be empty';
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...errors
        }
      }));
      return;
    }
    const {
      history
    } = this.props;
    const url = checkStatus();
    loginAction({
      userData: { email, password },
      history,
      url
    });
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
        <Header />
        <main>
          <section className="container form-container">
            <h2 className="section-title">SignIn</h2>
            <form className="form-card" onSubmit={this.userLogin}>
              <div className="errors">
                <ul />
              </div>
              <label htmlFor="email">
                Enter Email<span>*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-element"
                placeholder="email@gmail.com"
                onChange={this.handleInputOnChange}
                required
              />
              <div className="error" id="email-error" />
              <label htmlFor="password">
                Enter Password<span>*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-element"
                placeholder="........"
                onChange={this.handleInputOnChange}
                required
              />
              <div className="error" id="password-error" />
              <button
                id="button-submit"
                type="submit"
                className="btn btn-primary user-form"
              >
                Signin
              </button>
              <div className="margin--top--10 margin--below ">
                <p className="text--primary1">
                  Dont have an account?
                  <a href="./signup.html" className="text--color--grey">
                    <u>Sign Up</u>
                  </a>
                </p>
              </div>
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
  status: state.authReducer.status,
  error: state.authReducer.error
});

const mapDispatchToProps = {
  authAction
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
