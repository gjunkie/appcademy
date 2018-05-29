const Hapi = require('hapi');

const createUser = data => {
  return data;
};

// Login handler
module.exports = (request, h, callback) => {
  const promise = new Promise((resolve, reject) => {
    const User = request.server.plugins.db.User;
    User.findOne({ id: request.auth.credentials.profile.raw.id })
      .exec((err, user) => {
        if (err) {
          return Hapi.error.internal('find user', err);
        }
        if (!user) {
          const newUser = createUser(request.auth.credentials.profile);
          console.log('no user')
          console.log(newUser);
          //return newUser;
          resolve(newUser);
          return newUser;
          //const userData = {
            //id: request.auth.credentials.profile.raw.id,
            //name: request.auth.credentials.profile.raw.given_name,
            //email: request.auth.credentials.profile.raw.email,
            //color: null
          //};
          //User.create(userData, (err, newUser) => {
            //if (err) {
              //console.log('create err');
            //}
            //done(null, newUser);
            //});
        } else {
          // TODO: should prob update the user if they exist
          console.log('we have user')
          resolve('user');
        }
      });
  });
  return promise;
};
