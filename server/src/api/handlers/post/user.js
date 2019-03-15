import Hapi from 'hapi';
import Boom from 'boom';
import bcrypt from 'bcrypt-nodejs';
// import faker from 'faker';
import Validator from 'validator';

const SALT_ROUNDS = 10;

const validations= (data) => {
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

const generateUser = (userData, UserModel, resolve) => (
  UserModel.create(userData, (err, newUser) => {
    if (err) {
      return reject(Hapi.error.internal('create user', err));
    }
    return resolve({
      email: newUser.email,
      username: newUser.username,
    });
  })
);

const findUserBy = field => (
  new Promise((resolve, reject) => {
    const UserModel = request.server.plugins.db.User;
    UserModel.findOne({ [field]: request.payload[field] })
      .exec((err, user) => {
        if (err) {
          const error = Boom.badRequest('Invalid query', errors);
          error.output.payload.info = errors;
          resolve(errors);
        }
        const errors = {};
        if (user) { errors[field] = `${field} already exists` }
        resolve(errors);
      });
  })
);

const validateInput = (request, otherValidations) => {
  let { errors, isValid } = otherValidations(request.payload);

  return Promise.all([
    findUserBy('email', request),
    findUserBy('username', request),
  ]).then(([emailError, usernameError]) => {
    const finalErrors = Object.assign({}, errors, emailError, usernameError);
    return {
      errors: finalErrors,
      isValid,
    }
  });
};

/*
 * Creates a user with the payload sent in the request.
 */
const createUser = (request, h) => (
  new Promise((resolve, reject) => {
    validateInput(request, validations).then(({ errors, isValid }) => {
      const hasErrors = Object.keys(errors).length;

      if (!isValid || hasErrors) {
        const error = Boom.badRequest('Invalid query', errors);
        error.output.payload.info = errors;
        return reject(error);
      }

      bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        bcrypt.hash(request.payload.password, salt, null, (err, hash) => {
          const userData = {
            username: request.payload.username,
            email: request.payload.email,
            password: hash,
          };
          const UserModel = request.server.plugins.db.User;
          return generateUser(userData, UserModel, resolve);
        });
      });
    })
  })
);

export default createUser;
