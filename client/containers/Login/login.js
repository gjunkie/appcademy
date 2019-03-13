import React, { Component } from 'react';
import { object } from 'prop-types';

import 'isomorphic-fetch';
// import './styles.css';

class Login extends Component {
  login = () => {
    this.props.onLogin();
  }

  // good candidate for react hooks
  render() {
    return (
      <div className="profile">
        <h2>Login</h2>
        <div>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    )
  };
};

Login.defaultProps = {
  user: {},
};

Login.propTypes = {
  user: object,
};

export default Login;
