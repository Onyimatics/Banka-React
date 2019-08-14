import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
