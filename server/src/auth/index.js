import jwtAuth from 'hapi-auth-jwt2';

// bring your own validation function
const validate = async (decoded, request) => (
  new Promise((resolve) => {
    request.server.plugins.db.User.find({})
      .exec((err, users) => {
        if (!users) resolve({ isValid: false });

        users.map((user) => {
          if (!user._id === decoded.id) {
            return resolve({ isValid: false });
          }

          return resolve({ isValid: true });
        });
      });
  })
);

const plugin = {
  register: (server, options) => {
    server.register({
      plugin: jwtAuth,
    });

    console.log(options.secret)
    server.auth.strategy(
      'token', 'jwt',
      {
        key: options.secret, // Never Share your secret key
        validate, // validate function defined above
        verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
      },
    );

    server.auth.default('token');
  },
  name: 'auth',
  version: '1.0.0',
  once: true,
};

export default plugin;
