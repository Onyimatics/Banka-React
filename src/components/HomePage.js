import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/styles.css';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
  return (
    <div>
      <Header />
      <main>
        <section className="super">
          <h2 className="super-title">BUILDING THE BANK OF THE FUTURE</h2>
          <p className="super-paragraph">
            Banka is a banking application that powers banking operations like
            account creation, customer deposit and withdrawals. As a user of
            this platform, you can also view your account history after any
            transaction.
          </p>
          <div className="super-cta">
            <NavLink to="/signup" className="btn btn-white">
              Get Started
            </NavLink>
          </div>
        </section>
        {/* End Super Section */}
        {/* Begin Join Us Today Section */}
        <section className="how-to">
          <h2 className="section-title">Join Us Today</h2>
          <p className="section-text">Follow The Steps Below:</p>
          <div className="steps">
            <div className="column step">
              <span className="circle-icon">1</span>
              <p className="section-text">
                Sign up and log in as a user. You can decide to update your
                profile for better view on the platform.
              </p>
            </div>
            <div className="column step">
              <span className="circle-icon">2</span>
              <p className="section-text">
                Create an account as a user. By doing this, a unique account
                number will be generated for you by the system.
              </p>
            </div>
            <div className="column step">
              <span className="circle-icon">3</span>
              <p className="section-text">
                Your account will be activated and you can now enjoy our
                services.
              </p>
            </div>
          </div>
        </section>
        {/* End Join Us Today Section */}
      </main>
      {/* Begin Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
};

export default Layout;
