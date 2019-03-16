import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { object } from 'prop-types';

import validateInput from '../../helpers/validators/login';

// import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      errors: {},
      isSubmitting: false,
      password: '',
    }
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  login = () => {
    const userCreds = {
      identifier: this.state.identifier,
      password: this.state.password,
    };

    console.log({userCreds})
    return this.props.onLogin(userCreds);
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

    this.login().then(
      (response) => {
        return <Redirect to="/" />
      },
      (err) => {
        this.setState({
          errors: err.response.data.info,
          isSubmitting: false,
        });
      }
    );

  }

  // good candidate for react hooks
  render() {
    const {
      errors,
      identifier,
      isSubmitting,
      password
    } = this.state;

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
            value={identifier} />
          {errors.identifier && <span>{errors.identifier}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            onChange={this.onChange}
            type="password"
            value={password} />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <button disabled={isSubmitting} onClick={this.onSubmit}>Login</button>
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
