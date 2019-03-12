import React from 'react';
import { Link, Route } from 'react-router-dom';
import ExampleContainer from '../exampleContainer';
import Vote from '../Vote';
import Profile from '../Profile';
import './app.css';

const BaseApp = () => {
  return (
    <div>
      <header>
        <h1>Hapi-React-Kit</h1>
        <ul className="nav">
          <li><Link to={`/example/`}>Example Route</Link></li>
          <li><Link to={`/vote/`}>Vote</Link></li>
          <li><Link to={`/profile/`}>Profile</Link></li>
        </ul>
        <h3>You're up and running!</h3>
      </header>
      <div>The goal behind this boilerplate project was to ensure that the api and the client were kept separate. This is so that you can easily use a different node framework or remove React if you wish to do so.</div>

      <Route path="/example" exact component={ExampleContainer} />
      <Route path="/vote" exact component={Vote} />
      <Route path="/profile" exact component={Profile} />
    </div>
  );
};

export default BaseApp;
