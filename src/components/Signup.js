import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { authAction, logout } from '../store/modules/auth/actions';
import checkStatus from '../utils/checkStatus';

export class SignUpForm extends Component {
  constructor() {
    super();
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.userSignUp = this.userSignUp.bind(this);
    this.state = {
      submittting: false,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }
  userSignUp(e) {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const { authAction: signUpAction } = this.props;
    const errors = {};
    if (!firstName) errors.firstName = 'Firstname cannot be empty';
    if (!lastName) errors.lastName = 'Lastname cannot be empty';
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
    signUpAction({
      userData: { firstName, lastName, email, password },
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
    // const {
    //   isAuthenticated,
    //   location: { url }
    // } = this.props;
    // if (!isAuthenticated) return <Redirect to={url || '/signup'} />;
    return (
      <div>
        <Header />
        <main>
          <section className="container form-container">
            <h2 className="section-title">Sign Up</h2>
            <form className="form-card" onSubmit={this.userSignUp}>
              <div className="errors">
                <ul></ul>
              </div>
              <label htmlFor="firstname">
                Enter First Name<span>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-element"
                placeholder="Onyinye"
                onChange={this.handleInputOnChange}
                required
              />
              <div className="error" id="firstName-error" />
              <label htmlFor="lastName">
                Enter Last name<span>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-element"
                placeholder="Ezike"
                onChange={this.handleInputOnChange}
                required
              />
              <div className="error" id="lastName-error" />
              <label htmlFor="email">
                Enter Email<span>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
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
                id="password"
                name="password"
                className="form-element"
                placeholder=".........."
                onChange={this.handleInputOnChange}
                required
              />
              <div className="error" id="password-error" />
              <button type="submit" id="signup" className="btn btn-primary">
                Sign Up
              </button>
              <div className="margin--top--10 margin--below ">
                <p className="text--primary1">
                  Already have an account?
                  <Link to="/signin" className="text--color--grey">
                    <u>SignIn</u>
                  </Link>
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
  authAction,
  logout
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
