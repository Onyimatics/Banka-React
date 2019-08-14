import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Signin = props => {
  return (
    <div>
      <Header />
      <main>
        <section className="container form-container">
          <h2 className="section-title">SignIn</h2>
          <form className="form-card" action method="POST">
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
              required
            />
            <div className="error" id="password-error" />
            <div className="forgot--reset">
              <a href="./password-reset.html" className="text--color--grey">
                <u>Forgot Password?</u>
              </a>
            </div>
            <button id="button-submit" type="submit" className="btn btn-primary user-form">
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
};
export default Signin;
