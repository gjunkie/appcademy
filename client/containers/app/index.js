import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Vote from '../Vote';
import Profile from '../Profile';
import Login from '../Login';
import SignUp from '../SignUp';
import Navigation from '../../components/Navigation';

import './styles.css';

const BaseApp = () => (
  <div>
    <header>
      <h1>Appcademy Awards</h1>
      <Navigation />
    </header>

    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/vote" component={Vote} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </div>
);

export default BaseApp;
