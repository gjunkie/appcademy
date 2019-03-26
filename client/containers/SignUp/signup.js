import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';

import validateInput from '../../helpers/validators/signup';

const SignUp = ({
  onSignUp,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    const { errors, isValid } = validateInput({
      username,
      email,
      password,
      passwordConfirmation,
    });

    if (!isValid) {
      setFormErrors(errors);
    }

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setFormErrors({});
    setIsSubmitting(true);

    onSignUp({
      username,
      email,
      password,
      passwordConfirmation,
    }).then(() => {
      setFormSubmitted(true);
    },
    (err) => {
      setFormErrors(err.response.data.info);
      setIsSubmitting(false);
    });
  };

  if (formSubmitted) {
    return (
      <Redirect to="/login" />
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up!</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={event => setUsername(event.target.value)}
          type="text"
          value={username}
        />
        {formErrors.username && <span>{formErrors.username}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          onChange={event => setEmail(event.target.value)}
          type="text"
          value={email}
        />
        {formErrors.email && <span>{formErrors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={event => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        {formErrors.password && <span>{formErrors.password}</span>}
      </div>

      <div>
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange={event => setPasswordConfirmation(event.target.value)}
          type="password"
          value={passwordConfirmation}
        />
        {formErrors.passwordConfirmation && <span>{formErrors.passwordConfirmation}</span>}
      </div>

      <button disabled={isSubmitting}>Sign Up</button>
    </form>
  );
};

SignUp.propTypes = {
  onSignUp: func.isRequired,
};

export default SignUp;
