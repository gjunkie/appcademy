import Hapi from 'hapi';
import Boom from 'boom';
import Validator from 'validator';
// import faker from 'faker';

const validateInput = (data) => {
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
/*
 * Creates a user with the payload sent in the request.
 */
module.exports = (request, h) => {
  console.log("You hit the POST endpoint! You sent this:");
  console.log(request.payload);

  return new Promise((resolve, reject) => {
    const { errors, isValid } = validateInput(request.payload);
    if (!isValid) {
      return reject(Boom.badRequest('Invalid query', errors));
    }

    let User = request.server.plugins.db.User;
    const user = User.create(request.payload, function(err, newUser) {
      if (err) {
        return reject(Hapi.error.internal('create user', err));
      }
      return resolve(newUser)
    });

    return user;
  })
};

