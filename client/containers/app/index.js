import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExampleContainer from '../exampleContainer';
import Vote from '../Vote';
import Profile from '../Profile';
import Login from '../Login';
import Navigation from '../../components/Navigation';

import './styles.css';

const BaseApp = () => {
  return (
    <div>
      <header>
        <h1>Appcademy Awards</h1>
        <Navigation />
      </header>

      <Switch>
        <Route path="/example" exact component={ExampleContainer} />
        <Route path="/vote" component={Vote} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default BaseApp;
