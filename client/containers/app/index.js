import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../Admin';
import Game from '../Game';
import Home from '../Home';
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
      <Route path="/admin" exact component={Admin} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/game/:id" component={Game} />
    </Switch>
  </div>
);

export default BaseApp;
