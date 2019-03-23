import Boom from 'boom';
import jwt from 'jsonwebtoken';
import Validator from 'validator';

const validations = (data) => {
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
};

const updateUser = request => (
  new Promise((resolve) => {
    const { errors, isValid } = validations(request.payload);
    const hasErrors = Object.keys(errors).length;

    if (!isValid || hasErrors) {
      const error = Boom.badRequest('Invalid query', errors);
      error.output.payload.info = errors;
      resolve(error);
      return;
    }

    const UserModel = request.server.plugins.db.User;
    UserModel.findById(request.payload.id)
      .exec((err, user) => {
        if (!user) {
          const error = Boom.badRequest('User not found');
          resolve(error);
          return;
        }

        const updatedUser = user;
        updatedUser.email = request.payload.email;
        updatedUser.username = request.payload.username;

        updatedUser.save(() => {
          const lintedUser = {
            id: updatedUser._id,
            email: updatedUser.email,
            username: updatedUser.username,
          };
          const token = jwt.sign(lintedUser, request.server.app.AUTH_SECRET_KEY);
          resolve({ token });
        });
      });
  })
);

export default updateUser;
