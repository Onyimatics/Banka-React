import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import UserDashboard from '../components/UserDashboard';
import CreateAccountForm from '../components/CreateAccount';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/user-dashboard" component={UserDashboard} />
      <Route path="/create-account" component={CreateAccountForm} />
      />
    </Switch>
  </Router>
);

export default App;
