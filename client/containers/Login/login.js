import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';

import validateInput from '../../helpers/validators/login';

const Login = (props) => {
  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const { isAuthenticated } = props;

  const isValid = () => {
    const validations = validateInput(identifier, password);

    if (!validations.isValid) {
      setErrors(validations.errors);
    }

    return validations.isValid;
  };

  const login = () => {
    const { onLogin } = props;

    const userCreds = {
      identifier,
      password,
    };

    return onLogin(userCreds);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setErrors({});
    setIsSubmitting(true);

    login().then((err) => {
      setErrors(err.response.data.info);
      setIsSubmitting(false);
    });
  };


  if (isAuthenticated) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="profile">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="identifier">Username or Email</label>
          <input
            id="identifier"
            name="identifier"
            onChange={e => setIdentifier(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <button disabled={isSubmitting}>Login</button>
        </div>
      </form>
    </div>
  );
};


Login.propTypes = {
  isAuthenticated: bool.isRequired,
  onLogin: func.isRequired,
};

export default Login;
