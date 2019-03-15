import Validator from 'validator';

export default function validateInput(data) {
  let errors = {};

  if (!data.username.length) {
    errors.username = 'Username is required';
  }

  if (!data.email.length) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password.length) {
    errors.password = 'Password is required';
  }

  if (!data.passwordConfirmation.length) {
    errors.passwordConfirmation = 'Password confirmation is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  const hasErrors = Object.keys(errors).length;

  return {
    errors,
    isValid: !hasErrors,
  }
}
