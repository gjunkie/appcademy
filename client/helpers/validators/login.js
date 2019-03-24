export default function validateInput(identifier, password) {
  const errors = {};

  if (!identifier.length) {
    errors.identifier = 'This field is required';
  }

  if (!password.length) {
    errors.password = 'Password is required';
  }

  const hasErrors = Object.keys(errors).length;

  return {
    errors,
    isValid: !hasErrors,
  };
}
