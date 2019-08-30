import React, { Component } from 'react';
import Footer from './Footer';
import { DisplayAccounts } from './DisplayAccounts';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccounts } from '../store/modules/accounts/actions/index';
import { logout } from '../store/modules/auth/actions';
import { DisplayTransactions } from './DisplayTransactions';
import { getTransactions } from '../store/modules/transactions/actions/index';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      getAccount,
      match: {
        params: { email }
      }
    } = this.props;
    getAccount(email);
  }

  render() {
    const { data, user, getTransaction, transactions } = this.props;
    return (
      <div>
        <header>
          <nav className="navbar">
            <Link to="/" className="navbar-logo">
              Banka
            </Link>
            <button className="hamburger-menu">
              <a className="hamburger" />
            </button>
            <ul className="navbar-menu">
              <li className="navbar-link">
                <Link to="/create-account">Create Account</Link>
              </li>
              <li className="navbar-link">
                <Link to="/" onClick={this.props.logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="container">
            <div className="profile">
              <div className="card profile-card">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 53 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6125 41.552L10.7055 45.865C10.2415 46.118 9.82452 46.429 9.43652 46.768C14.0465 50.655 19.9975 53 26.4995 53C32.9535 53 38.8665 50.69 43.4635 46.856C43.0395 46.498 42.5795 46.176 42.0695 45.922L33.6025 41.689C32.5085 41.142 31.8175 40.024 31.8175 38.801V35.479C32.0555 35.208 32.3275 34.86 32.6185 34.449C33.7725 32.819 34.6455 31.026 35.2505 29.145C36.3365 28.81 37.1365 27.807 37.1365 26.615V23.069C37.1365 22.289 36.7895 21.592 36.2505 21.104V15.978C36.2505 15.978 37.3035 8.00098 26.5005 8.00098C15.6975 8.00098 16.7505 15.978 16.7505 15.978V21.104C16.2105 21.592 15.8645 22.289 15.8645 23.069V26.615C15.8645 27.549 16.3555 28.371 17.0905 28.846C17.9765 32.703 20.2965 35.479 20.2965 35.479V38.719C20.2955 39.899 19.6495 40.986 18.6125 41.552Z"
                    fill="#E7ECED"
                  />
                  <path
                    d="M26.9529 0.00394616C12.3199 -0.246054 0.253949 11.4139 0.00394877 26.0469C-0.138051 34.3439 3.55995 41.8009 9.44795 46.7599C9.83295 46.4239 10.2459 46.1159 10.7049 45.8659L18.6119 41.5529C19.6489 40.9869 20.2949 39.8999 20.2949 38.7179V35.4779C20.2949 35.4779 17.9739 32.7019 17.0889 28.8449C16.3549 28.3699 15.8629 27.5489 15.8629 26.6139V23.0679C15.8629 22.2879 16.2099 21.5909 16.7489 21.1029V15.9769C16.7489 15.9769 15.6959 7.99995 26.4989 7.99995C37.3019 7.99995 36.249 15.9769 36.249 15.9769V21.1029C36.789 21.5909 37.1349 22.2879 37.1349 23.0679V26.6139C37.1349 27.8059 36.335 28.8089 35.249 29.1439C34.644 31.0249 33.771 32.8179 32.617 34.4479C32.326 34.8589 32.0539 35.2069 31.8159 35.4779V38.7999C31.8159 40.0229 32.507 41.1419 33.601 41.6879L42.068 45.9209C42.576 46.1749 43.035 46.4959 43.458 46.8529C49.168 42.0909 52.8569 34.9709 52.9939 26.9529C53.2459 12.3199 41.5869 0.253946 26.9529 0.00394616Z"
                    fill="#556080"
                  />
                </svg>
                <div className="profile-picture">
                  <div className="middle">
                    <li className="upload">
                      <form>
                        <div className="fupload">click to upload</div>
                        <input
                          type="file"
                          name="upload"
                          id="rupload"
                          className="rupload"
                        />
                      </form>
                    </li>
                  </div>
                </div>
                <p />
                <h2 id="user-name">
                  {user.firstname} {user.lastname}
                </h2>
                <p />
                <table id="account-content" className="stats-table">
                  <thead>
                    <tr>
                      <th>Account Number</th>
                      <th>Account Type</th>
                      <th>Bal(₦)</th>
                      <th>View Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length ? (
                      data.map(account => (
                        <DisplayAccounts
                          getAccounts={account}
                          getTransaction={getTransaction}
                        />
                      ))
                    ) : (
                      <tr className="">
                        <td colSpan="4">
                          No Account found, Click on Create account to create a
                          new bank account
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div id="account" className="stats-table" />
              </div>
              <div className="profile-table">
                <h2 className="feature">Transaction History</h2>
                <div className="errors">
                  <ul></ul>
                </div>
                <table id="transaction-table" className="stats-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction type</th>
                      <th>Amount(₦)</th>
                      <th>Old Balance(₦)</th>
                      <th>New Balance(₦)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length ? (
                      transactions.map(transaction => (
                        <DisplayTransactions getTransactions={transaction} />
                      ))
                    ) : (
                      <tr className="">
                        <td colSpan="5">
                          No transactions found on this Account
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div id="transaction" className="stats-table" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.accountReducer.data,
  transactions: state.transactionReducer.transactions,
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
  error: state.authReducer.error
});

const mapDispatchToProps = {
  getAccount: getAccounts,
  getTransaction: getTransactions,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
