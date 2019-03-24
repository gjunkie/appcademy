import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';

import validateInput from '../../helpers/validators/signup';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
      isSubmitting: false,
      password: '',
      passwordConfirmation: '',
      username: '',
    };
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
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

    this.props.onSignUp(this.state).then(() => {
      return <Redirect to="/" />
    },
    (err) => {
      this.setState({
        errors: err.response.data.info,
        isSubmitting: false,
      });
    });
  }

  render() {
    const {
      errors,
      isSubmitting,
    } = this.state;

    const {
      isAuthenticated,
    } = this.props;

    if (!isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Sign Up!</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={this.onChange}
            type="text"
            value={this.state.username} />
          {errors.username && <span>{errors.username}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={this.onChange}
            type="text"
            value={this.state.email} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            onChange={this.onChange}
            type="password"
            value={this.state.password} />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={this.onChange}
            type="password"
            value={this.state.passwordConfirmation} />
          {errors.passwordConfirmation && <span>{errors.passwordConfirmation}</span>}
        </div>

        <button disabled={isSubmitting}>Sign Up</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  isAuthenticated: bool.isRequired,
  onSignUp: func.isRequired,
};

export default SignUp;
