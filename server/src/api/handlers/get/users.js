var Hapi = require('hapi');

// Get users
module.exports = (request, h) => {
  let users = request.server.plugins.db.User.find(function(err, docs) {
    return docs;
  });

  return users;
};
