import Hapi from 'hapi';
import Boom from 'boom';
import bcrypt from 'bcrypt-nodejs';
import Validator from 'validator';

const findUserBy = (field, request) => (
  new Promise((resolve, reject) => {
    const UserModel = request.server.plugins.db.User;
    UserModel.findOne({ [field]: request.payload.identifier })
      .exec((err, user) => {
        if (err) {
          const error = Boom.badRequest('Invalid query', errors);
          error.output.payload.info = errors;
          reject(error);
        }
        if (!user) {
          resolve(false);
        }

        resolve(user);
    });
  })
);

const findUser = request => (
  Promise.all([
    findUserBy('email', request),
    findUserBy('username', request),
  ]).then(([userByEmail, userByUsername]) => {
    const user = userByEmail || userByUsername;

    if (!user) {
      const errors = {
        identifier: 'Not Found',
      }
      return { errors };
    }

    return {
      userFound: true,
      user,
    };
  })
);

/*
 * Creates a user with the payload sent in the request.
 */
const auth = (request, h) => (
  new Promise((resolve, reject) => {
    findUser(request).then((data) => {
      if (data.errors || !data.user) {
        const error = Boom.unauthorized('Unauthorized', data.errors);
        error.output.payload.info = data.errors;
        resolve(error);
      }

      bcrypt.compare(request.payload.password, data.user.password, (err, res) => {
        resolve({
          email: data.user.email,
          username: data.user.username,
        });
      });
    });
  })
);

export default auth;
