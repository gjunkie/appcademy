import Validator from 'validator';

export default function validateInput(data) {
  const errors = {};

  if (!data.username.length) {
    errors.username = 'Username is required';
  }

  if (!data.email.length) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  const hasErrors = Object.keys(errors).length;

  return {
    errors,
    isValid: !hasErrors,
  };
}
