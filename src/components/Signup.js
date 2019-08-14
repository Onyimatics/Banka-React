import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Signup = props => {
  return (
    <div>
      <Header />
      <main>
        <section className="container form-container">
          <h2 className="section-title">Sign Up</h2>
          <form className="form-card" action method="POST">
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
              required
            />
            <div className="error" id="password-error" />
            <button type="submit" id="signup" className="btn btn-primary">
              Sign Up
            </button>
            <div className="margin--top--10 margin--below ">
              <p className="text--primary1">
                Already have an account?
                <a href="./signin.html" className="text--color--grey">
                  <u>SignIn</u>
                </a>
              </p>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Signup;
