var Hapi = require('hapi');

// Get users
module.exports = async (request, h) => {
  let users = request.server.plugins.db.User.find(function(err, docs) {
    return docs;
  });

  return users;
};
