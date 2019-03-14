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

const createUser = (userData, UserModel, resolve) => {
  return UserModel.create(userData, function(err, newUser) {
    if (err) {
      return reject(Hapi.error.internal('create user', err));
    }
    return resolve({
      email: newUser.email,
      username: newUser.username,
    });
  });
};

const findUserBy = (field, value, UserModel) => {
  return new Promise((resolve, reject) => {
    UserModel
      .findOne({ [field]: value })
      .exec(function(err, user){
        if (err) {
          const error = Boom.badRequest('Invalid query', errors);
          error.output.payload.info = errors;
        }
        const errors = {};
        if (user) { errors[field] = `${field} already exists` }
        resolve(errors);
      });
  });
};

const validateInput = (request, otherValidations) => {
  let { errors, isValid } = otherValidations(request.payload);
  const UserModel = request.server.plugins.db.User;

  return Promise.all([
    findUserBy('email', request.payload.email, UserModel),
    findUserBy('username', request.payload.username, UserModel),
  ]).then(([emailError, usernameError]) => {
    console.log('resolved', emailError, usernameError)
    const finalErrors = Object.assign({}, errors, emailError, usernameError);
    console.log({finalErrors})

    return {
      errors: finalErrors,
      isValid,
    }
  });
};

/*
 * Creates a user with the payload sent in the request.
 */
module.exports = (request, h) => {
  return new Promise((resolve, reject) => {
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
          return createUser(userData, UserModel, resolve);
        });
      });
    })
  })
};

