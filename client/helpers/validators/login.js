import Validator from 'validator';

export default function validateInput(data) {
  let errors = {};

  if (!data.identifier.length) {
    errors.identifier = 'This field is required';
  }

  if (!data.password.length) {
    errors.password = 'This field is required';
  }

  const hasErrors = Object.keys(errors).length;

  return {
    errors,
    isValid: !hasErrors,
  }
}
