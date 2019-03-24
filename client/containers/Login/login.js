import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';

import validateInput from '../../helpers/validators/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      errors: {},
      isSubmitting: false,
      password: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.isValid()) return;

    this.setState({
      errors: {},
      isSubmitting: true,
    });

    this.login().then((err) => {
      this.setState({
        errors: err.response.data.info,
        isSubmitting: false,
      });
    });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  login = () => {
    const { onLogin } = this.props;
    const { identifier, password } = this.state;

    const userCreds = {
      identifier,
      password,
    };

    return onLogin(userCreds);
  }

  // good candidate for react hooks
  render() {
    const {
      errors,
      identifier,
      isSubmitting,
      password,
    } = this.state;

    const {
      isAuthenticated,
    } = this.props;

    if (isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="profile">
        <h2>Login</h2>
        <div>
          <label htmlFor="identifier">Username or Email</label>
          <input
            id="identifier"
            name="identifier"
            onChange={this.onChange}
            type="text"
            value={identifier}
          />
          {errors.identifier && <span>{errors.identifier}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            onChange={this.onChange}
            type="password"
            value={password}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <button type="button" disabled={isSubmitting} onClick={this.onSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: bool.isRequired,
  onLogin: func.isRequired,
};

export default Login;
